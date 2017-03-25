const self = require('sdk/self');
const tabs = require("sdk/tabs");
const { viewFor } = require("sdk/view/core");
const { getBrowserForTab } = require("sdk/tabs/utils");
const fxprefs = require("sdk/preferences/service");

const symbolStore = require("lib/symbol-store");

function makeProfileAvailableToTab(profile, tab) {
  const browser = getBrowserForTab(viewFor(tab));
  const mm = browser.messageManager;
  mm.loadFrameScript(self.data.url('tab-framescript.js'), true);
  mm.sendAsyncMessage("GeckoProfilerAddon:Init", profile);
  mm.addMessageListener('GeckoProfilerAddon:GetSymbolTable', e => {
    const { debugName, breakpadId } = e.data;
    symbolStore.getSymbols(debugName, breakpadId).then(result => {
      const [addr, index, buffer] = result;
      mm.sendAsyncMessage('GeckoProfilerAddon:GetSymbolTableReply', {
        status: 'success',
        debugName, breakpadId, result: [addr, index, buffer]
      });
    }, error => {
      mm.sendAsyncMessage('GeckoProfilerAddon:GetSymbolTableReply', {
        status: 'error',
        debugName, breakpadId,
        error: `${error}`,
      });
    })
  });
}

function createProfilerUIController(prefPrefix, panelPort, profiler, reportUrl) {
  let settings = {
    buffersize: 1000000,
    interval: 1,
    features: {
      js: true,
      stackwalk: true,
      tasktracer: false,
    },
    threads: "GeckoMain,Compositor",
  };

  function readPrefs() {
    settings.buffersize = fxprefs.get(prefPrefix + ".entries", 1000000);
    settings.interval = +fxprefs.get(prefPrefix + ".intervalMs", "1");
    settings.threads = fxprefs.get(prefPrefix + ".threadfilter", "GeckoMain,Compositor");
    settings.features.js = fxprefs.get(prefPrefix + ".js", true);
    settings.features.stackwalk = fxprefs.get(prefPrefix + ".stackwalk", true);
    settings.features.tasktracer = fxprefs.get(prefPrefix + ".tasktracer", false);
  }

  function setPrefs() {
    fxprefs.set(prefPrefix + ".version", 9);
    fxprefs.set(prefPrefix + ".entries", settings.buffersize);
    fxprefs.set(prefPrefix + ".intervalMs", `${settings.interval}`);
    fxprefs.set(prefPrefix + ".threadfilter", settings.threads);
    fxprefs.set(prefPrefix + ".js", settings.features.js);
    fxprefs.set(prefPrefix + ".stackwalk", settings.features.stackwalk);
    fxprefs.set(prefPrefix + ".tasktracer", settings.features.tasktracer);
  }

  function getUpToDateSettings() {
    readPrefs();
    return settings;
  }

  function startProfiler() {
    readPrefs();
    const threads = settings.threads.split(",");
    const enabledFeatures = Object.keys(settings.features).filter(f => settings.features[f]);
    enabledFeatures.push("leaf");
    if (threads.length > 0) {
      enabledFeatures.push("threads");
    }
    return profiler.start(settings.buffersize, settings.interval,
                          enabledFeatures, threads);
  }

  function toggleProfilerStartStop() {
    profiler.isRunning().then(running => {
      if (running) {
        profiler.stop();
      } else {
        startProfiler();
      }
    })
  }

  function collectProfile() {
    // Pause profiler before we collect the profile, so that we don't capture
    // more samples while the parent process waits for subprocess profiles.
    profiler.pause().catch(() => {});

    var profilePromise = profiler.getProfile().catch(e => (console.error(e), {}));
    var tabOpenPromise = new Promise((resolve, reject) => {
      tabs.open({
        url: reportUrl,
        onReady: resolve
      });
    });
    var symbolStorePrimingPromise =
      profiler.getSharedLibraryInformation().then(sli => symbolStore.prime(sli, profiler.platform));

    Promise.all([profilePromise, tabOpenPromise, symbolStorePrimingPromise]).then(function ([profile, tab]) {
      makeProfileAvailableToTab(profile, tab);
    }).catch(error => {
      console.log("error getting profile:");
      console.error(error)
      tabOpenPromise.then(tab => tab.url = `data:text/html,${error}`);
    }).then(() => profiler.isRunning()).then(isRunning => {
      // Resume the profiler after profiler page is opened.
      if (isRunning) {
        profiler.resume().catch(() => {});
      }
    });
  }

  readPrefs();
  setPrefs();

  profiler.addIsRunningObserver(isRunning => {
    panelPort.emit('ProfilerStateUpdated', { isRunning });
  });

  // Start the profiler, unless it's already running (for example due to
  // startup profiling environment variables). In that case, starting the
  // profiler again would throw away the data that is currently in the
  // profiler buffer.
  profiler.isRunning().then(running => {
    if (!running) {
      startProfiler();
    }
  });

  panelPort.emit('ProfilerStateUpdated', settings);
  panelPort.emit('ProfilerStateUpdated', { settingsOpen: false });
  panelPort.emit('ProfilerStateUpdated', { isRunning: false });

  panelPort.on('ProfilerControlEvent', e => {
    switch (e.type) {
      case 'StartProfiler':
        startProfiler();
        panelPort.emit('ProfilerStateUpdated', { isRunning: true });
        break;
      case 'StopProfiler':
        profiler.stop();
        panelPort.emit('ProfilerStateUpdated', { isRunning: false });
        break;
      case 'CaptureProfile':
        collectProfile();
        break;
      case 'PanelHeightUpdated':
        break;
      case 'ChangeSetting': {
        const changedSettings = Object.assign({}, e);
        delete changedSettings.type;
        Object.assign(settings, changedSettings);
        setPrefs();
        break;
      }
      case 'ChangeFeature': {
        const changedFeatures = Object.assign({}, e);
        delete changedFeatures.type;
        Object.assign(settings.features, changedFeatures);
        setPrefs();
        break;
      }
      default:
    }
  });

  return { settings, profiler, toggleProfilerStartStop, collectProfile, getUpToDateSettings };
}

exports.createProfilerUIController = createProfilerUIController;

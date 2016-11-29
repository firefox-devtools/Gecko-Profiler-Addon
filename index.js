const self = require('sdk/self');
const asyncStorage = require("lib/async-storage");
const profiler = require("lib/profiler");
const symbolStore = require("lib/symbol-store");
const { Hotkey } = require("sdk/hotkeys");
const tabs = require("sdk/tabs");
const { viewFor } = require("sdk/view/core");
const { getBrowserForTab } = require("sdk/tabs/utils");
const { prefs } = require("sdk/simple-prefs");
const { ToggleButton } = require('sdk/ui/button/toggle');
const { Panel } = require("sdk/panel");

// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
  asyncStorage.setItem("dummytext", text).then(() => {
    return asyncStorage.getItem("dummytext");
  }).then(callback);
}

function getNSSSymbols() {
  return profiler.getSharedLibraryInformation().then(libs => {
    let loadedNSSLibs = libs.filter(lib => {
      return lib.pdbName.toLowerCase().startsWith("libnss3");
    });
    return Promise.all(loadedNSSLibs.map(lib => {
      return symbolStore.getSymbols(lib.pdbName, lib.breakpadId, lib.name,
                                    profiler.platform.platform,
                                    profiler.platform.arch);
    }));
  });
}

let settings = {
  entries: 1000000,
  interval: 0.4,
  features: ["js", "stackwalk", "threads", "leaf", "tasktracer"],
  threads: ["GeckoMain", "Compositor"]
}

function startProfiler() {
  profiler.start(settings.entries, settings.interval,
                 settings.features, settings.threads);
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

const panel = Panel({
  width: 280,
  height: 109,
  contentURL: self.data.url('panel.html'),
  contentScriptFile: self.data.url('panel.js'),
  onHide: () => {
    try {
      button.state('window', { checked: false });
    } catch (e) {}
  },
});

const button = ToggleButton({
  id: 'gecko-profiler',
  label: 'Gecko Profiler',
  icon: self.data.url('img/toolbar_off.png'),
  onChange: (state) => {
    if (state.checked) {
      panel.show({ position: button });
    }
  },
});

profiler.addIsRunningObserver(isRunning => {
  button.icon = isRunning ? self.data.url('img/toolbar_on.png') : self.data.url('img/toolbar_off.png');
  panel.port.emit('ProfilerStateUpdated', { isRunning });
});

panel.port.on('ProfilerControlEvent', e => {
  switch (e.type) {
    case 'StartProfiler':
      startProfiler();
      break;
    case 'StopProfiler':
      profiler.stop();
      break;
    case 'CaptureProfile':
      panel.hide();
      collectProfile();
      break;
    default:
  }
});

function makeProfileAvailableToTab(profile, tab) {
  const browser = getBrowserForTab(viewFor(tab));
  const mm = browser.messageManager;
  mm.loadFrameScript(self.data.url('cleopatra-tab-framescript.js'), true);
  mm.sendAsyncMessage("Cleopatra:Init", profile);
  mm.addMessageListener('Cleopatra:GetSymbolTable', e => {
    const { pdbName, breakpadId } = e.data;
    symbolStore.getSymbols(pdbName, breakpadId).then(result => {
      const [addr, index, buffer] = result;
      mm.sendAsyncMessage('Cleopatra:GetSymbolTableReply', {
        status: 'success',
        pdbName, breakpadId, result: [addr, index, buffer]
      });
    }, error => {
      mm.sendAsyncMessage('Cleopatra:GetSymbolTableReply', {
        status: 'error',
        pdbName, breakpadId, error
      });
    })
  });
}

function collectProfile() {
  var profilePromise = profiler.getProfile();
  var tabOpenPromise = new Promise((resolve, reject) => {
    tabs.open({
      url: prefs.reportUrl,
      onReady: resolve
    });
  });
  var symbolStorePrimingPromise =
    profiler.getSharedLibraryInformation().then(sli => symbolStore.prime(sli, profiler.platform));

  Promise.all([profilePromise, tabOpenPromise, symbolStorePrimingPromise]).then(function ([profile, tab]) {
    makeProfileAvailableToTab(profile, tab);
  }).catch(error => {
    console.log("error getting profile:");
    console.log(error)
    tabOpenPromise.then(tab => tab.url = `data:text/html,${error}`);
  });
}

let startStopHotKey = Hotkey({
  combo: "control-shift-5",
  onPress: toggleProfilerStartStop
});

let collectHotKey = Hotkey({
  combo: "control-shift-6",
  onPress: collectProfile
});

function main(options, callbacks) {
  startProfiler();
}

exports.getNSSSymbols = getNSSSymbols;
exports.main = main;
exports.dummy = dummy;

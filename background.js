function adjustState(newState) {
  Object.assign(window.profilerState, newState);
  browser.storage.local.set({profilerState: window.profilerState});
}

function makeProfileAvailableToTab(profile, port) {
  port.postMessage({ type: 'ProfilerConnectToPage', payload: profile });

  port.onMessage.addListener(async message => {
    if (message.type === 'ProfilerGetSymbolTable') {
      const { debugName, breakpadId } = message;
      try {
        const [ addresses, index, buffer ] = await browser.geckoProfiler.getSymbols(debugName, breakpadId);

        port.postMessage({
          type: 'ProfilerGetSymbolTableReply',
          status: 'success',
          result: [addresses, index, buffer],
          debugName, breakpadId
        });
      } catch (e) {
        port.postMessage({
          type: 'ProfilerGetSymbolTableReply',
          status: 'error',
          error: `${e}`,
          debugName, breakpadId
        });
      }
    }
  });
}

async function createAndWaitForTab(url) {
  const listenForConnectPromise = listenOnceForConnect('ProfilerPage');

  const tabPromise = browser.tabs.create({
    active: true,
    url: window.profilerState.reportUrl,
  });

  const tab = await tabPromise;
  const port = await listenForConnectPromise;
  return { tab, port };
}

async function listenOnceForConnect(name) {
  window.connectDeferred[name] = {};
  window.connectDeferred[name].promise = new Promise((resolve, reject) =>  {
    Object.assign(window.connectDeferred[name], { resolve, reject });
  });
  return await window.connectDeferred[name].promise;
}

async function captureProfile() {
  // Pause profiler before we collect the profile, so that we don't capture
  // more samples while the parent process waits for subprocess profiles.
  await browser.geckoProfiler.pause().catch(() => {});

  const profilePromise = browser.geckoProfiler.getProfile().catch(e => (console.error(e), {}));
  const tabOpenPromise = createAndWaitForTab(window.profilerState.reportUrl);

  try {
    const [profile, { port }] = await Promise.all([profilePromise, tabOpenPromise]);
    makeProfileAvailableToTab(profile, port);
  } catch (e) {
    console.error(e);
    const { tab } = await tabOpenPromise;
    // TODO data URL doesn't seem to be working. Permissions issue?
    // await browser.tabs.update(tab.id, { url: `data:text/html,${encodeURIComponent(e.toString)}` });
  }

  try {
    await browser.geckoProfiler.resume();
  } catch (e) {
    console.error(e);
  }
}

async function startProfiler() {
  const settings = window.profilerState;
  const threads = settings.threads.split(",");
  const enabledFeatures = Object.keys(settings.features).filter(f => settings.features[f]);
  enabledFeatures.push("leaf");
  if (threads.length > 0) {
    enabledFeatures.push("threads");
  }
  const options = {
    bufferSize: settings.buffersize,
    interval: settings.interval,
    features: enabledFeatures,
    threads,
  };
  await browser.geckoProfiler.start(options);
}

async function stopProfiler() {
  await browser.geckoProfiler.stop();
}

async function restartProfiler() {
  await stopProfiler();
  await startProfiler();
}

(async () => {
  window.profilerState = (await browser.storage.local.get('profilerState')).profilerState;

  if (!window.profilerState) {
    window.profilerState = {};
    adjustState({
      isRunning: false,
      settingsOpen: false,
      buffersize: 1000000,
      interval: 1,
      features: {
        js: true,
        stackwalk: true,
        tasktracer: false,
      },
      threads: 'GeckoMain,Compositor',
      reportUrl: 'https://perf-html.io/from-addon/',
    });
  }

  browser.geckoProfiler.onRunning.addListener(isRunning => {
    adjustState({ isRunning });
    browser.browserAction.setIcon({ path: `icons/toolbar_${isRunning ? 'on' : 'off' }.png` });
    for (const popup of browser.extension.getViews({ type: 'popup' })) {
      popup.renderState(window.profilerState);
    }
  });

  browser.commands.onCommand.addListener(command => {
    if (command === 'ToggleProfiler') {
      if (window.profilerState.isRunning) {
        stopProfiler();
      } else {
        startProfiler();
      }
    } else if (command === 'CaptureProfile') {
      if (window.profilerState.isRunning) {
        captureProfile();
      }
    }
  });

  window.connectDeferred = {};
  browser.runtime.onConnect.addListener(port => {
    if (window.connectDeferred[port.name]) {
      window.connectDeferred[port.name].resolve(port);
    }
  });
})();


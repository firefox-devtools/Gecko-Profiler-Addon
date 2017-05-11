export function toggle() {
  return async (dispatch, getState) => {
    if (getState().profiler.isRunning) {
      return dispatch(stop());
    } else {
      return dispatch(start());
    }
  };
}

export function start() {
  return async (dispatch, getState) => {
    const { settings } = getState();
    const threads = settings.threads.split(',');
    const enabledFeatures = Object.keys(settings.features).filter(
      f => settings.features[f]
    );
    enabledFeatures.push('leaf');
    if (threads.length > 0) {
      enabledFeatures.push('threads');
    }
    const options = {
      bufferSize: settings.buffersize,
      interval: settings.interval,
      features: enabledFeatures,
      threads,
    };
    dispatch({ type: 'PROFILER_STARTING' });
    await browser.geckoProfiler.start(options).catch(() => {});
    dispatch({ type: 'PROFILER_STARTED' });
  };
}

export function stop() {
  return async dispatch => {
    dispatch({ type: 'PROFILER_STOPPING' });
    await browser.geckoProfiler.stop();
    dispatch({ type: 'PROFILER_STOPPED' });
  };
}

export function capture() {
  return async (dispatch, getState) => {
    // Pause profiler before we collect the profile, so that we don't capture
    // more samples while the parent process waits for subprocess profiles.
    dispatch({ type: 'PROFILER_PAUSING' });
    await browser.geckoProfiler.pause().catch(() => {});
    dispatch({ type: 'PROFILER_PAUSED' });

    try {
      browser.tabs.create(
        {
          active: true,
          url: getState().settings.reportUrl,
        },
        async tab => {
          dispatch({ type: 'PROFILER_CAPTURING' });
          const profile = await browser.geckoProfiler
            .getProfile()
            .catch(e => (console.error(e), {}));
          dispatch({ type: 'PROFILER_CAPTURED' });
          browser.tabs.sendMessage(tab.id, {
            type: 'ProfilerConnectToPage',
            payload: profile,
          });
        }
      );
    } catch (e) {
      console.error(e);
      // TODO data URL doesn't seem to be working. Permissions issue?
      // await browser.tabs.update(tab.id, { url: `data:text/html,${encodeURIComponent(e.toString)}` });
    }

    try {
      dispatch({ type: 'PROFILER_RESUMING' });
      await browser.geckoProfiler.resume();
      dispatch({ type: 'PROFILER_RESUMED' });
    } catch (e) {
      console.error(e);
    }
  };
}

export function restart() {
  return async dispatch => {
    dispatch(start());
    dispatch(stop());
  };
}

export function running(isRunning) {
  return {
    type: 'IS_RUNNING',
    data: isRunning,
  };
}

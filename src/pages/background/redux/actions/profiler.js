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
    const options = {
      bufferSize: settings.buffersize,
      interval: settings.interval,
      features: Object.keys(settings.features).filter(
        f => settings.features[f]
      ),
      threads: settings.threads.split(','),
    };
    dispatch({ type: 'PROFILER_START', status: 'start' });
    await browser.geckoProfiler.start(options).catch(() => {});
    dispatch({ type: 'PROFILER_START', status: 'done' });
  };
}

export function stop() {
  return async dispatch => {
    dispatch({ type: 'PROFILER_STOP', status: 'start' });
    await browser.geckoProfiler.stop();
    dispatch({ type: 'PROFILER_STOP', status: 'done' });
  };
}

function getProfilePreferablyAsArrayBuffer() {
  // This is a compatibility wrapper for Firefox builds from before 1362800
  // landed. We can remove it once Nightly switches to 56.
  if ('getProfileAsArrayBuffer' in browser.geckoProfiler) {
    return browser.geckoProfiler
      .getProfileAsArrayBuffer()
      .catch(e => (console.error(e), {}));
  }
  return browser.geckoProfiler.getProfile().catch(e => (console.error(e), {}));
}

export function capture() {
  return async (dispatch, getState) => {
    // Pause profiler before we collect the profile, so that we don't capture
    // more samples while the parent process waits for subprocess profiles.
    dispatch({ type: 'PROFILER_PAUSE', status: 'start' });
    await browser.geckoProfiler.pause().catch(() => {});
    dispatch({ type: 'PROFILER_PAUSE', status: 'done' });

    browser.tabs
      .create({
        active: true,
        url: getState().settings.reportUrl,
      })
      .then(
        async () => {
          dispatch({ type: 'PROFILER_CAPTURE', status: 'start' });
          const profile = await getProfilePreferablyAsArrayBuffer();
          dispatch({
            type: 'PROFILER_CAPTURE',
            status: 'done',
            data: profile,
          });
        },
        error => console.error(error)
      );

    try {
      dispatch({ type: 'PROFILER_RESUME', status: 'start' });
      await browser.geckoProfiler.resume();
      dispatch({ type: 'PROFILER_RESUME', status: 'done' });
    } catch (e) {
      console.error(e);
    }
  };
}

export function restart() {
  return async (dispatch, getState) => {
    const wasRunning = getState().profiler.isRunning;

    // only stop the profiler if it is running
    if (getState().profiler.isRunning) {
      await dispatch(stop());
    }
    // only start the profiler if it was running and we stopped it
    if (wasRunning) {
      await dispatch(start());
    }
  };
}

export function getSymbols({ debugName, breakpadId }) {
  return async dispatch => {
    dispatch({
      type: 'GET_SYMBOLS',
      status: 'start',
      data: { debugName, breakpadId },
    });
    const [addresses, index, buffer] = await browser.geckoProfiler.getSymbols(
      debugName,
      breakpadId
    );
    dispatch({
      type: 'GET_SYMBOLS',
      status: 'done',
      data: { debugName, breakpadId, addresses, index, buffer },
    });
  };
}

export function running(isRunning) {
  return {
    type: 'IS_RUNNING',
    data: isRunning,
  };
}

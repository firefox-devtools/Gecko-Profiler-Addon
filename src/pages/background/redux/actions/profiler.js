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
    const {
      settings: { buffersize, interval, features, threads },
    } = getState();
    const options = {
      buffersize,
      interval,
      features: Object.keys(features).filter(f => features[f]),
      threads: threads,
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
    return browser.geckoProfiler.getProfileAsArrayBuffer();
  }
  return browser.geckoProfiler.getProfile();
}

export function capture() {
  return async (dispatch, getState) => {
    // Pause profiler before we collect the profile, so that we don't capture
    // more samples while the parent process waits for subprocess profiles.
    await dispatch({ type: 'PROFILER_PAUSE', status: 'start' });
    await browser.geckoProfiler.pause().catch(() => {});
    await dispatch({ type: 'PROFILER_PAUSE', status: 'done' });

    await browser.tabs
      .create({
        active: true,
        url: getState().settings.reportUrl,
      })
      .then(async () => {
        await dispatch({ type: 'PROFILER_CAPTURE', status: 'start' });
        try {
          const profile = await getProfilePreferablyAsArrayBuffer();
          await dispatch({
            type: 'PROFILER_CAPTURE',
            status: 'done',
            data: profile,
          });
        } catch (e) {
          await dispatch({
            type: 'PROFILER_CAPTURE',
            status: 'error',
            data: e,
          });
          console.error(e);
        }
      })
      .catch(e => console.error(e));

    try {
      await dispatch({ type: 'PROFILER_RESUME', status: 'start' });
      await browser.geckoProfiler.resume();
      await dispatch({ type: 'PROFILER_RESUME', status: 'done' });
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

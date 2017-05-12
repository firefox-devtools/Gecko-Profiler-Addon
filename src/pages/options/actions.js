export function restart() {
  return {
    type: 'RESTART_PROFILER',
  };
}

function getPermissionFromProfileViewerURL(url) {
  return url.replace(/:[0-9]+/, '') + '/*';
}

export function update({ reportUrl = 'https://perf-html.io' }) {
  return async (dispatch, getState) => {
    const granted = await browser.permissions.request({
      origins: [getPermissionFromProfileViewerURL(reportUrl)],
    });
    if (!granted) {
      return dispatch({ type: 'PERMISSION_ERROR' });
    }
    await browser.permissions.remove({
      origins: [getPermissionFromProfileViewerURL(reportUrl)],
    });
    dispatch({
      type: 'UPDATE_SETTINGS',
      data: { reportUrl },
    });
    return dispatch(restart());
  };
}

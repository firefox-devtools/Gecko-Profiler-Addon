export default ({ getState }) => next => action => {
  const result = next(action);
  if (action.type === 'UPDATE_SETTINGS' || action.type === 'TOGGLE_SETTINGS') {
    browser.storage.local.set({ profilerState: getState().settings });
  }
  return result;
};

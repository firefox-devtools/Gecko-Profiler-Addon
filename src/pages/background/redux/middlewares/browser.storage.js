export const SETTINGS_KEY = 'profilerState';

export default ({ getState }) => next => action => {
  const result = next(action);
  if (action.type === 'UPDATE_SETTINGS' || action.type === 'TOGGLE_SETTINGS') {
    browser.storage.local.set({ [SETTINGS_KEY]: getState().settings });
  }
  return result;
};

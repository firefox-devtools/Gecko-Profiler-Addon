import store from '../src/pages/background/redux/store';
import { update } from '../src/pages/background/redux/actions/settings';
import init, { SETTINGS_KEY } from '../src/pages/background/storage';

describe('init', () => {
  it('should initialize with the local storage', async () => {
    expect(browser.storage.local.get).toHaveBeenCalledTimes(0);
    await init();
    expect(browser.storage.local.get).toHaveBeenCalledTimes(1);
    expect(browser.storage.local.get).toHaveBeenCalledWith(SETTINGS_KEY);
    // And by initializing we also set the new settings, this r/t could be removed
    expect(browser.storage.local.set).toHaveBeenCalledTimes(1);
  });

  it('should save settings updates to local storage', () => {
    browser.storage.local.set.mockClear();
    store.dispatch(update({ isOpen: true }));
    expect(browser.storage.local.set).toHaveBeenCalledTimes(1);
  });
});

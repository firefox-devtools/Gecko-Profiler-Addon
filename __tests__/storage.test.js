import init, { SETTINGS_KEY } from '../src/pages/background/storage';

describe('init', () => {
  it('should initialize with the local storage', async done => {
    expect(browser.storage.local.get).toHaveBeenCalledTimes(0);
    await init();
    expect(browser.storage.local.get).toHaveBeenCalledTimes(1);
    expect(browser.storage.local.get).toHaveBeenCalledWith(SETTINGS_KEY);
    done();
  });
});

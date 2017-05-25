import store from '../src/pages/background/redux/store';
import * as actions from '../src/pages/background/redux/actions/profiler';
import init from '../src/pages/background/browserAction';

describe('browserAction', () => {
  it('should change icons when running or stopped', () => {
    init();
    store.dispatch(actions.running(true));
    expect(browser.browserAction.setIcon).toHaveBeenLastCalledWith({
      path: `icons/toolbar_on.png`,
    });
    store.dispatch(actions.running(false));
    expect(browser.browserAction.setIcon).toHaveBeenLastCalledWith({
      path: `icons/toolbar_off.png`,
    });
  });
});

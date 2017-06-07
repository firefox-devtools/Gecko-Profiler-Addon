import store from '../src/pages/background/redux/store';
import init, {
  TOGGLE_PROFILE_COMMAND,
  CAPTURE_PROFILE_COMMAND,
} from '../src/pages/background/commands';

describe('commands', () => {
  init();

  it('should add a callback to onCommand events', () => {
    expect(browser.commands.onCommand.addListener).toHaveBeenCalled();
  });

  it('should dispatch action for toggle profile', () => {
    const spy = jest.spyOn(store, 'dispatch');
    const listener = browser.commands.onCommand.addListener.mock.calls[0][0];

    listener(TOGGLE_PROFILE_COMMAND);

    // not checking that state transition happens here because we check that in
    // the store unit tests
    expect(spy).toHaveBeenCalled();

    spy.mockReset();
    spy.mockRestore();
  });

  it('should dispatch action for capture profile', () => {
    const spy = jest.spyOn(store, 'dispatch');
    const listener = browser.commands.onCommand.addListener.mock.calls[0][0];

    listener(CAPTURE_PROFILE_COMMAND);

    expect(spy).toHaveBeenCalled();

    spy.mockReset();
    spy.mockRestore();
  });
});

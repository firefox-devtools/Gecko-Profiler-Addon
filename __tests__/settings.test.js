import store from '../src/pages/background/redux/store';
import reducer from '../src/pages/background/redux/reducers/settings';
import * as actions from '../src/pages/background/redux/actions/settings';

describe('reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      isOpen: false,
      reportUrl: 'https://perf-html.io/from-addon/',
      buffersize: 1000000,
      interval: 1,
      threads: ['GeckoMain', 'Compositor'],
      features: {
        js: true,
        stackwalk: true,
        tasktracer: false,
        leaf: true,
        threads: true,
      },
    });
  });

  it('should include threads feature when there are threads', () => {
    const threads = ['this', 'that', 'the', 'other', ''];
    expect(
      reducer({}, { type: 'UPDATE_SETTINGS', data: { threads } })
    ).toEqual({
      threads,
      features: {
        threads: true,
      },
    });
  });

  it('should exclude threads feature when no threads', () => {
    // at first only one thread, then none
    const threads = ['one'];
    expect(
      reducer({}, { type: 'UPDATE_SETTINGS', data: { threads } })
    ).toEqual({
      threads,
      features: {
        threads: true,
      },
    });
    expect(
      reducer({}, { type: 'UPDATE_SETTINGS', data: { threads: [] } })
    ).toEqual({
      threads: [],
      features: {
        threads: false,
      },
    });
  });
});

describe('actions', () => {
  it('should not save when state is not updated', () => {
    store.dispatch({ type: 'DO_OTHER_THINGS' });
    expect(browser.storage.local.set).toHaveBeenCalledTimes(0);
  });

  it('should save the updated state', () => {
    const initial = store.getState().settings;
    const threads = ['fa', 'la', 'la', 'la', 'la'];
    const state = { ...initial, threads };
    store.dispatch(actions.update({ threads }));
    expect(browser.storage.local.set).toHaveBeenLastCalledWith({
      profilerState: state,
    });
  });

  it('should save when the settings are toggled', () => {
    const initial = store.getState().settings;
    const isOpen = true;
    const state = { ...initial, isOpen };
    store.dispatch(actions.toggle());
    expect(browser.storage.local.set).toHaveBeenLastCalledWith({
      profilerState: state,
    });
  });
});

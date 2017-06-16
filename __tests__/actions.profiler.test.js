import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import reducer from '../src/pages/background/redux/reducers';
import * as actions from '../src/pages/background/redux/actions/profiler';

const mockStore = configureMockStore([thunk]);

describe('actions.profiler', () => {
  describe('toggle', () => {
    beforeEach(() => {
      browser.geckoProfiler.start.mockClear();
      browser.geckoProfiler.stop.mockClear();
    });

    it('should toggle the profiler on from stopped', () => {
      const store = mockStore(reducer(undefined, {}));
      const expectedActions = [
        { type: 'PROFILER_START', status: 'start' },
        { type: 'PROFILER_START', status: 'done' },
      ];
      return store.dispatch(actions.toggle()).then(() => {
        expect(browser.geckoProfiler.start).toHaveBeenCalled();
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
    it('should toggle the profiler off from running', () => {
      const store = mockStore(
        reducer(undefined, { type: 'IS_RUNNING', data: true })
      );
      const expectedActions = [
        { type: 'PROFILER_STOP', status: 'start' },
        { type: 'PROFILER_STOP', status: 'done' },
      ];
      return store.dispatch(actions.toggle()).then(() => {
        expect(browser.geckoProfiler.stop).toHaveBeenCalled();
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('start', () => {
    beforeEach(() => {
      browser.geckoProfiler.start.mockClear();
    });

    it('should start the profiler', () => {
      const state = reducer(undefined, {});
      const store = mockStore(state);
      const expectedActions = [
        { type: 'PROFILER_START', status: 'start' },
        { type: 'PROFILER_START', status: 'done' },
      ];
      return store.dispatch(actions.start()).then(() => {
        expect(browser.geckoProfiler.start).toHaveBeenCalled();
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('stop', () => {
    it('should stop the profiler', () => {
      const state = reducer(undefined, {});
      const store = mockStore(state);
      const expectedActions = [
        { type: 'PROFILER_STOP', status: 'start' },
        { type: 'PROFILER_STOP', status: 'done' },
      ];
      return store.dispatch(actions.stop()).then(() => {
        expect(browser.geckoProfiler.stop).toHaveBeenCalled();
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('capture', () => {
    beforeEach(() => {
      browser.geckoProfiler.pause.mockClear();
      browser.tabs.create.mockClear();
      browser.geckoProfiler.getProfileAsArrayBuffer.mockClear();
      browser.geckoProfiler.resume.mockClear();
    });

    it('should capture a profile', () => {
      const state = reducer(undefined, {});
      const store = mockStore(state);
      const expectedActions = [
        { type: 'PROFILER_PAUSE', status: 'start' },
        { type: 'PROFILER_PAUSE', status: 'done' },
        { type: 'PROFILER_CAPTURE', status: 'start' },
        { type: 'PROFILER_CAPTURE', status: 'done' },
        { type: 'PROFILER_RESUME', status: 'start' },
        { type: 'PROFILER_RESUME', status: 'done' },
      ];
      return store.dispatch(actions.capture()).then(() => {
        expect(browser.geckoProfiler.pause).toHaveBeenCalled();
        expect(browser.tabs.create).toHaveBeenCalled();
        expect(
          browser.geckoProfiler.getProfileAsArrayBuffer
        ).toHaveBeenCalled();
        expect(browser.geckoProfiler.resume).toHaveBeenCalled();
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should use getProfile when getProfileAsArrayBuffer does not exist', async () => {
      delete browser.geckoProfiler.getProfileAsArrayBuffer;
      const state = reducer(undefined, {});
      const store = mockStore(state);
      const expectedActions = [
        { type: 'PROFILER_PAUSE', status: 'start' },
        { type: 'PROFILER_PAUSE', status: 'done' },
        { type: 'PROFILER_CAPTURE', status: 'start' },
        { type: 'PROFILER_CAPTURE', status: 'done' },
        { type: 'PROFILER_RESUME', status: 'start' },
        { type: 'PROFILER_RESUME', status: 'done' },
      ];

      await store.dispatch(actions.capture());
      expect(browser.geckoProfiler.pause).toHaveBeenCalled();
      expect(browser.tabs.create).toHaveBeenCalled();
      expect('getProfileAsArrayBuffer' in browser.geckoProfiler).toBe(false);
      expect(browser.geckoProfiler.getProfile).toHaveBeenCalled();
      expect(browser.geckoProfiler.resume).toHaveBeenCalled();
      expect(store.getActions()).toEqual(expectedActions);
      // reset mock
      browser.geckoProfiler.getProfileAsArrayBuffer = jest.fn();
    });

    it('should console error if getProfileAsArrayBuffer throws', async () => {
      global.console = { error: jest.fn() };
      const e = new Error('millenials are lazy');
      browser.geckoProfiler.getProfileAsArrayBuffer = jest.fn(() => {
        throw e;
      });
      const state = reducer(undefined, {});
      const store = mockStore(state);
      const expectedActions = [
        { type: 'PROFILER_PAUSE', status: 'start' },
        { type: 'PROFILER_PAUSE', status: 'done' },
        { type: 'PROFILER_CAPTURE', status: 'start' },
        { type: 'PROFILER_CAPTURE', status: 'error', data: e },
        { type: 'PROFILER_RESUME', status: 'start' },
        { type: 'PROFILER_RESUME', status: 'done' },
      ];

      await store.dispatch(actions.capture());
      expect(global.console.error).toBeCalledWith(e);
      expect(browser.geckoProfiler.pause).toHaveBeenCalled();
      expect(browser.tabs.create).toHaveBeenCalled();
      expect(browser.geckoProfiler.getProfileAsArrayBuffer).toHaveBeenCalled();
      expect(browser.geckoProfiler.resume).toHaveBeenCalled();
      expect(store.getActions()).toEqual(expectedActions);
      browser.geckoProfiler.getProfileAsArrayBuffer = jest.fn();
    });

    it('should console error if getProfile throws', async () => {
      global.console = { error: jest.fn() };
      const e = new Error('millenials are lazy');
      delete browser.geckoProfiler.getProfileAsArrayBuffer;
      browser.geckoProfiler.getProfile = jest.fn(() => {
        throw e;
      });
      const state = reducer(undefined, {});
      const store = mockStore(state);
      const expectedActions = [
        { type: 'PROFILER_PAUSE', status: 'start' },
        { type: 'PROFILER_PAUSE', status: 'done' },
        { type: 'PROFILER_CAPTURE', status: 'start' },
        { type: 'PROFILER_CAPTURE', status: 'error', data: e },
        { type: 'PROFILER_RESUME', status: 'start' },
        { type: 'PROFILER_RESUME', status: 'done' },
      ];

      await store.dispatch(actions.capture());
      expect(global.console.error).toBeCalledWith(e);
      expect(browser.geckoProfiler.pause).toHaveBeenCalled();
      expect(browser.tabs.create).toHaveBeenCalled();
      expect('getProfileAsArrayBuffer' in browser.geckoProfiler).toBe(false);
      expect(browser.geckoProfiler.getProfile).toHaveBeenCalled();
      expect(browser.geckoProfiler.resume).toHaveBeenCalled();
      expect(store.getActions()).toEqual(expectedActions);
      // reset mocks
      browser.geckoProfiler.getProfileAsArrayBuffer = jest.fn();
      browser.geckoProfiler.getProfile = jest.fn();
    });
  });

  describe('restart', () => {
    beforeEach(() => {
      browser.geckoProfiler.start.mockClear();
      browser.geckoProfiler.stop.mockClear();
    });

    it('should restart the profiler if running', () => {
      const state = reducer(undefined, { type: 'IS_RUNNING', data: true });
      const store = mockStore(state);
      const expectedActions = [
        { status: 'start', type: 'PROFILER_STOP' },
        { status: 'done', type: 'PROFILER_STOP' },
        { status: 'start', type: 'PROFILER_START' },
        { status: 'done', type: 'PROFILER_START' },
      ];
      return store.dispatch(actions.restart()).then(() => {
        expect(browser.geckoProfiler.stop).toHaveBeenCalled();
        expect(browser.geckoProfiler.start).toHaveBeenCalled();
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
    it('should only start when not already running', () => {
      const state = reducer(undefined, {});
      const store = mockStore(state);
      const expectedActions = [];
      return store.dispatch(actions.restart()).then(() => {
        expect(browser.geckoProfiler.stop).not.toHaveBeenCalled();
        expect(browser.geckoProfiler.start).not.toHaveBeenCalled();
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('getSymbols', () => {
    it('should call the API', () => {
      const debugName = 'DEBUG_NAME';
      const breakpadId = 'BREAKPAD_ID';
      const [addresses, index, buffer] = ['ADRESSES', 'INDEX', 'BUFFER'];
      browser.geckoProfiler.getSymbols = jest.fn(() =>
        Promise.resolve([addresses, index, buffer])
      );
      const state = reducer(undefined, {});
      const store = mockStore(state);
      const expectedActions = [
        {
          type: 'GET_SYMBOLS',
          status: 'start',
          data: { debugName, breakpadId },
        },
        {
          type: 'GET_SYMBOLS',
          status: 'done',
          data: { debugName, breakpadId, addresses, index, buffer },
        },
      ];
      return store
        .dispatch(actions.getSymbols({ debugName, breakpadId }))
        .then(() => {
          expect(browser.geckoProfiler.getSymbols).toHaveBeenCalled();
          expect(store.getActions()).toEqual(expectedActions);
          browser.geckoProfiler.getSymbols.mockReset();
        });
    });
  });

  describe('running', () => {
    it('should set isRunning to false', () => {
      const state = reducer(undefined, {});
      const store = mockStore(state);
      const isRunning = false;
      const oneAction = { type: 'IS_RUNNING', data: isRunning };
      const expectedActions = [oneAction];
      expect(store.dispatch(actions.running(isRunning))).toEqual(oneAction);
      expect(store.getActions()).toEqual(expectedActions);
    });
    it('should set isRunning to true', () => {
      const state = reducer(undefined, {});
      const store = mockStore(state);
      const isRunning = true;
      const oneAction = { type: 'IS_RUNNING', data: isRunning };
      const expectedActions = [oneAction];
      expect(store.dispatch(actions.running(isRunning))).toEqual(oneAction);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

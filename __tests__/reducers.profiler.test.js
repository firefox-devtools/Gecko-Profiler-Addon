import reducer from '../src/pages/background/redux/reducers';
import { unique } from '../src/utils/symbol';

describe('reducers.profiler', () => {
  it('should maintain a consistent default state', () => {
    expect(reducer(undefined, {}).profiler).toMatchSnapshot();
  });

  describe('IS_RUNNING', () => {
    it('should set the running state', () => {
      const state = reducer(undefined, { type: 'IS_RUNNING', data: true });
      expect(state.profiler.isRunning).toBe(true);
      expect(
        reducer(state, { type: 'IS_RUNNING', data: false }).profiler.isRunning
      ).toBe(false);
    });
  });

  describe('PROFILER_CAPTURE', () => {
    it('should do nothing until the status is done', () => {
      const state = reducer(undefined, {});
      expect(
        reducer(state, { type: 'PROFILER_CAPTURE', status: 'start' })
      ).toBe(state);
    });
    it('should attach the profile data to the store', () => {
      const data = { foo: 'bar' };
      const { profiler } = reducer(undefined, {
        type: 'PROFILER_CAPTURE',
        status: 'done',
        data,
      });
      expect(profiler.profile).toEqual(data);
    });
  });

  describe('GET_SYMBOLS', () => {
    it('should do nothing until the status is done', () => {
      const state = reducer(undefined, {});
      expect(reducer(state, { type: 'GET_SYMBOLS', status: 'start' })).toBe(
        state
      );
    });
    it('should generate unique symbol addresses in the symbol table', () => {
      const debugName = 'DEBUG_NAME',
        breakpadId = 'BREAKPAD_ID',
        addresses = 'addresses',
        index = 'index',
        buffer = 'buffer';
      const data = { debugName, breakpadId, addresses, index, buffer };
      const state = reducer(undefined, {});
      state.profiler.symbols = {
        [unique(debugName, breakpadId)]: [addresses, index, buffer],
      };
      expect(
        reducer(state, { type: 'GET_SYMBOLS', status: 'done', data })
      ).toEqual(state);
    });
  });
});

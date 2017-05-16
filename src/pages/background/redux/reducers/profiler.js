import { unique } from '../../../../utils/symbol';

const initialState = {
  symbols: new Map(),
  profile: null,
  isRunning: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'IS_RUNNING':
      return { ...state, isRunning: action.data };
    case 'PROFILER_CAPTURE':
      if (action.status === 'done') {
        return { ...state, profile: action.data };
      }
      return state;
    case 'SYMBOLS':
      if (action.status === 'done') {
        const { debugName, breakpadId, addresses, index, buffer } = action.data;
        const symbols = new Map(state.symbols);
        symbols.set(unique(debugName, breakpadId), [addresses, index, buffer]);
        return { ...state, symbols };
      }
      return state;
    default:
      return state;
  }
}

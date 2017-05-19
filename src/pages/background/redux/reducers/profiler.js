import { unique } from '../../../../utils/symbol';

const initialState = {
  symbols: {},
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
    case 'GET_SYMBOLS':
      if (action.status === 'done') {
        const { debugName, breakpadId, addresses, index, buffer } = action.data;
        return {
          ...state,
          symbols: {
            ...state.symbols,
            [unique(debugName, breakpadId)]: [addresses, index, buffer],
          },
        };
      }
      return state;
    default:
      return state;
  }
}

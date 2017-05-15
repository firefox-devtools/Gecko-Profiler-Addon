const initialState = {
  symbols: null,
  profile: null,
  isRunning: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'IS_RUNNING':
      return Object.assign({}, state, { isRunning: action.data });
    case 'PROFILER_CAPTURE':
      if (action.status === 'done') {
        return Object.assign({}, state, { profile: action.data });
      }
      return state;
    case 'SYMBOLS':
      if (action.status === 'done') {
        return Object.assign({}, state, { symbols: action.data });
      }
      return state;
    default:
      return state;
  }
}

const initialState = {
  isRunning: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'IS_RUNNING':
      return Object.assign({}, state, { isRunning: action.data });
    case 'STOP_PROFILER':
      return Object.assign({}, state, { isRunning: false });
    case 'START_PROFILER':
      return Object.assign({}, state, { isRunning: true });
    default:
      return state;
  }
}

const initialState = {
  isOpen: false,
  reportUrl: 'https://perf-html.io/from-addon/',
  buffersize: 1000000,
  interval: 1,
  threads: 'GeckoMain,Compositor',
  features: {
    js: true,
    stackwalk: true,
    tasktracer: false,
  },
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_SETTINGS':
      return Object.assign({}, state, action.data);
    case 'TOGGLE_SETTINGS':
      return Object.assign({}, state, { isOpen: !state.isOpen });
    default:
      return state;
  }
}

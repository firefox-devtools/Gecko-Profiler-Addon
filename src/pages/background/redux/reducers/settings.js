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
      return {
        ...state,
        ...action.data,
        features: { ...state.features, ...action.data.features },
      };
    case 'TOGGLE_SETTINGS':
      return { ...state, isOpen: !state.isOpen };
    default:
      return state;
  }
}

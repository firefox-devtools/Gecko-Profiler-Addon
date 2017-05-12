import merge from 'lodash.merge';

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
      // becuse we use a nested { features: {} } we need a deep merge
      // you could flatten this state out if you wanted to drop the lodash dep
      return merge({}, state, action.data);
    case 'TOGGLE_SETTINGS':
      return Object.assign({}, state, { isOpen: !state.isOpen });
    default:
      return state;
  }
}

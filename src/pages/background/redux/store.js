import { createStore, applyMiddleware } from 'redux';
import { createBackgroundStore } from 'redux-webext';
import initSubscriber from 'redux-subscriber';
import middlewares from './middlewares';
import reducers from './reducers';
import {
  toggle as toggleProfiler,
  start,
  stop,
  capture,
  restart,
  getSymbols,
} from './actions/profiler';
import { update, toggle as toggleSettings } from './actions/settings';

const store = createStore(reducers, applyMiddleware(...middlewares));

initSubscriber(store);

export default createBackgroundStore({
  store,
  actions: {
    ['TOGGLE_PROFILER']: toggleProfiler,
    ['START_PROFILER']: start,
    ['STOP_PROFILER']: stop,
    ['CAPTURE_PROFILE']: capture,
    ['RESTART_PROFILER']: restart,
    ['UPDATE_SETTINGS']: update,
    ['TOGGLE_SETTINGS']: toggleSettings,
    ['GET_SYMBOLS']: getSymbols,
  },
  onDisconnect() {},
});

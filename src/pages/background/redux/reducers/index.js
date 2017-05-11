import { combineReducers } from 'redux';
import profiler from './profiler';
import settings from './settings';

const reducers = combineReducers({
  profiler,
  settings,
});

export default (state, action) => reducers(state, action);

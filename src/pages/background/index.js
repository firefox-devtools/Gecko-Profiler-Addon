import browserAction from './browserAction';
import commands from './commands';
import profiler from './profiler';
import storage from './storage';

async function init() {
  storage();
  profiler();
  commands();
  browserAction();
}

init();

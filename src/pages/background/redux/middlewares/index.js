import thunk from 'redux-thunk';
import storage from './browser.storage.local';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require('redux-logger');
  middlewares.push(createLogger({ collapsed: true }));
}

middlewares.push(storage);

export default middlewares;

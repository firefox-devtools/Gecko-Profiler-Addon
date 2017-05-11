import thunk from 'redux-thunk';

const middlewares = [thunk];

/* eslint-disable global-require */
if (true) {
  const { createLogger } = require('redux-logger');
  middlewares.push(createLogger({ collapsed: true }));
}
/* eslint-enable global-require */

export default middlewares;

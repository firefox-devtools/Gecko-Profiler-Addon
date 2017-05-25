import thunk from 'redux-thunk';
import storage from './browser.storage';
import logger from './logger';

const middlewares = [thunk, logger, storage];

export default middlewares;

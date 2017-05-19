import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@kadira/storybook';

import { createStore, applyMiddleware } from 'redux';

import middlewares from '../pages/background/redux/middlewares';
import reducers from '../pages/background/redux/reducers';

const store = createStore(reducers, applyMiddleware(...middlewares));

import Page from '../pages/popup/components/page';
import Options from '../pages/options/components';

global.chrome = {};
global.browser = {
  permissions: {
    remove: () => {
      return new Promise(resolve => resolve());
    },
    request: () => {
      return new Promise(resolve => resolve(true));
    },
  },
};

storiesOf('Redux React Stories ', module)
  .addDecorator(getStory => (
    <Provider store={store}>
      {getStory()}
    </Provider>
  ))
  .add('Popup', () => <Page />)
  .add('Options', () => <Options />);
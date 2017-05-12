import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createUIStore } from 'redux-webext';
import Options from './components';

async function init() {
  const store = await createUIStore();

  ReactDOM.render(
    <Provider store={store}>
      <Options />
    </Provider>,
    document.getElementById('root')
  );
}

init();

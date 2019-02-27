import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './store';
import { App } from './App';

import { initFetchMocks } from '../utils/initFetchMocks';
import { settingsMocks } from './services/settingsMocks';
import { pagesMocks } from './services/pagesMocks';

console.log('WEBPACK_ENV', WEBPACK_ENV);

if (WEBPACK_ENV.isDev) {
  initFetchMocks(settingsMocks, pagesMocks);
  if (module.hot) module.hot.accept();
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  window.document.getElementById('app')
);

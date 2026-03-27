import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './store';
import './styles/global.scss';

const root = document.getElementById('root');

// To be removed after some time
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const registration of registrations) {
      registration.unregister();
    }
  });

  if ('caches' in window) {
    caches.keys().then((names) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const name of names) caches.delete(name);
    });
  }
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  root,
);

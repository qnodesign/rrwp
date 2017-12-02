import './polyfill/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import config from 'config';
import LoadingIndicator from './widgets/LoadingIndicator';
import { setLanguage } from './services/StoreDispatcher';
import ErrorBoundary from './components/ErrorBoundary';
import App from './components/App';

const container = document.getElementById('root');
ReactDOM.render(<LoadingIndicator />, container, () => {
  setLanguage().then(() => {
    ReactDOM.render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>,
      container
    );
  });
});

if (!config.prod && module.hot) {
  module.hot.accept();
}

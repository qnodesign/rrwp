import './polyfill/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import config from 'config';
import LoadingIndicator from './widgets/LoadingIndicator';
// import loadResources from './services/ResourceService';
import App from './components/App';

const container = document.getElementById('root');
ReactDOM.render(<LoadingIndicator />, container, () => {
  ReactDOM.render(<App />, container);
});

if (!config.prod && module.hot) {
  module.hot.accept();
}

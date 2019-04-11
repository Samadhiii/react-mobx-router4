import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import store from './stores/AppStore';
import App from './views/App';

ReactDOM.render(
  <App store={store} />,
  document.getElementById('app')
);


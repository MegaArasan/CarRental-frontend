import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './redux/store.js';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// Only the pending frontend work remains:
// implement role-based access on frontend so that admin users only can add new cars, manage offers, and access the reports section.
// The backend implementation is already completed.
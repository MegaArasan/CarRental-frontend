import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';

import { carsReducer } from './reducers/carsReducer';
import { alertsReducer } from './reducers/alertsReducer.js';
import { bookingsReducer } from './reducers/bookingsReducer.js';
import { authReducer } from './reducers/authReducer';
import { profileReducer } from './reducers/profileReducer';
import { adminReducer } from './reducers/adminReducer';

const composeEnhancers = composeWithDevTools({});

const rootReducer = combineReducers({
  carsReducer,
  alertsReducer,
  bookingsReducer,
  authReducer,
  profileReducer,
  adminReducer,
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;

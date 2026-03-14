import axios from 'axios';
import store from '../redux/store';
import { API_URL } from '../globalconstant';

const api = axios.create({ baseURL: API_URL, withCredentials: true });

api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const csrfToken = state.authReducer.csrfToken;

    if (csrfToken) {
      config.headers = config.headers ?? {};
      config.headers['x-csrf-token'] = csrfToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch({ type: 'LOADING', payload: false });
    }
    return Promise.reject(error);
  }
);

export default api;

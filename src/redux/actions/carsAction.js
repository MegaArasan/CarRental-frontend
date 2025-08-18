import axios from 'axios';
import { API_URL } from '../../globalconstant.js';

export const getAllCars = () => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });
  try {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const response = await axios.get(`${API_URL}/api/v1/cars`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    dispatch({ type: 'GET_ALL_CARS', payload: response.data.data });
    dispatch({ type: 'LOADING', payload: false });
  } catch (error) {
    window.alert(error);
    dispatch({ type: 'LOADING', payload: false });
  }
};

export const getCarById = (reqObj) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });
  const { carId } = reqObj;
  try {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const response = await axios.get(`${API_URL}/api/v1/cars?id=${carId}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    dispatch({ type: 'GET_CAR_ID', payload: response.data.data });
    dispatch({ type: 'LOADING', payload: false });
  } catch (error) {
    window.alert(error);
    dispatch({ type: 'LOADING', payload: false });
  }
};

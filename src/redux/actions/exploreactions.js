import axios from 'axios';
import { API_URL } from '../../globalconstant';

export const exploreBookings = () => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });
  try {
    const response = await axios.get(`${API_URL}/api/v1/explore`, {
      withCredentials: true,
    });

    dispatch({ type: 'EXPLORE', payload: response.data.data });
    dispatch({ type: 'LOADING', payload: false });
  } catch (error) {
    console.log(error);
    window.alert(error);
    dispatch({ type: 'LOADING', payload: false });
  }
};

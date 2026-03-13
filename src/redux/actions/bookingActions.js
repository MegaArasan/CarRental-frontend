import api from '../../utils/api';

/**
 * BOOK CAR
 * - Cookie auth
 * - CSRF auto attached
 * - No Authorization header
 */
export const bookCar = (reqObj) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    const { data } = await api.post('/bookings/bookcar', reqObj);

    // Razorpay order only (allowed)
    localStorage.setItem('order', JSON.stringify(data));

    dispatch({ type: 'LOADING', payload: false });
    return { success: true, data: data };
  } catch (error) {
    console.error(error);
    dispatch({ type: 'LOADING', payload: false });
    return { success: false, data: error.response?.data?.message || 'Booking failed' };
  }
};

/**
 * GET ALL BOOKINGS
 * - Auth via cookie
 */
export const getAllBookings = () => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    const { data } = await api.get('/bookings/getallbookings');

    dispatch({
      type: 'GET_ALL_BOOKINGS',
      payload: data.data,
    });

    dispatch({ type: 'LOADING', payload: false });
  } catch (error) {
    console.error(error);
    dispatch({ type: 'LOADING', payload: false });
  }
};

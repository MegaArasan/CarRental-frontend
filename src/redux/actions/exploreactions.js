import api from '../../utils/api';

/**
 * EXPLORE BOOKINGS
 * - Uses cookie-based auth automatically
 * - No token
 * - No localStorage
 */
export const exploreBookings = () => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    const { data } = await api.get('/explore');

    dispatch({
      type: 'EXPLORE',
      payload: data.data,
    });

    dispatch({ type: 'LOADING', payload: false });
  } catch (error) {
    console.error(error);

    dispatch({
      type: 'ERROR',
      payload: error.response?.data?.message || 'Failed to load explore data',
    });

    dispatch({ type: 'LOADING', payload: false });
  }
};

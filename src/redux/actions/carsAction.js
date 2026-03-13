import api from '../../utils/api';

/**
 * GET ALL CARS
 */
export const getAllCars = () => async (dispatch) => {
  dispatch({ type: 'GET_ALL_CARS_REQUEST', payload: true });

  try {
    const { data } = await api.get('/cars');

    dispatch({
      type: 'GET_ALL_CARS',
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: 'GET_ALL_CARS_FAIL',
      payload: error.response?.data?.message || error.message,
    });
  }
};

/**
 * GET CAR BY ID
 */
export const getCarById =
  ({ carId }) =>
  async (dispatch) => {
    dispatch({ type: 'GET_ALL_CARS_REQUEST', payload: true });

    try {
      const { data } = await api.get(`/cars?id=${carId}`);

      dispatch({
        type: 'GET_CAR_ID',
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: 'GET_ALL_CARS_FAIL',
        payload: error.response?.data?.message || error.message,
      });
    }
  };

/**
 * GET ALL MAKE & MODEL
 */
export const getAllMakeModel = () => async (dispatch) => {
  dispatch({ type: 'GET_ALL_CARS_REQUEST', payload: true });

  try {
    const { data } = await api.get('/cars/getMakeAndModel');

    dispatch({
      type: 'GET_ALL_MAKE_MODEL',
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: 'GET_ALL_CARS_FAIL',
      payload: error.response?.data?.message || error.message,
    });
  }
};

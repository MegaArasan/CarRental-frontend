import api from '../../utils/api';

/**
 * Fetch profile (used to check login status)
 */
export const fetchProfile = () => async (dispatch) => {
  try {
    const { data } = await api.get('/user/profile');

    dispatch({
      type: 'PROFILE_SUCCESS',
      payload: data.data,
    });
  } catch (error) {
    console.error('Profile fetch failed:', error.response?.status);
    dispatch({ type: 'LOGOUT' });
  }
};

/**
 * Fetch CSRF token
 * - Calls backend /auth/csrf
 * - Backend sets csrf_token cookie
 */
export const fetchCsrfToken = () => async (dispatch) => {
  try {
    const { data } = await api.get('/csrf');
    dispatch({ type: 'SET_CSRF_TOKEN', payload: data.data });
  } catch (error) {
    console.error('Failed to fetch CSRF token', error);
  }
};

/**
 * LOGIN
 */
export const userLogin = (reqObj) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    await api.post('/user/login', reqObj);

    // fetch profile after login
    await dispatch(fetchProfile());

    dispatch({ type: 'LOADING', payload: false });

    return { success: true, data: 'Logged in successfully' };
  } catch (error) {
    console.error(error);
    dispatch({ type: 'LOADING', payload: false });
    return { success: false, data: error.response?.data?.message || 'Invalid email or password' };
  }
};

/**
 * REGISTER
 */
export const userRegister = (reqObj) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    await api.post('/user/register', reqObj);

    dispatch({ type: 'LOADING', payload: false });

    setTimeout(() => {
      window.location.href = '/login';
    }, 500);
  } catch (error) {
    console.error(error);
    dispatch({ type: 'LOADING', payload: false });
    return { success: false, data: error.response?.data?.message || 'Email already exists' };
  }
};

/**
 * FORGOT PASSWORD
 */
export const userForgotpass = (reqObj) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    await api.post('/user/forgotpassword', reqObj);

    // window.alert('Verification link sent to registered email');
    dispatch({ type: 'LOADING', payload: false });

    setTimeout(() => {
      window.location.href = '/login';
    }, 2000);
  } catch (error) {
    console.error(error);
    dispatch({ type: 'LOADING', payload: false });
    return {
      success: false,
      data: error.response?.data?.message || 'Something went wrong',
    };
  }
};

/**
 * RESET PASSWORD
 */
export const userResetpass = (reqObj) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });

  const { userId, token } = reqObj;

  try {
    await api.post(`/users/password-reset/${userId}/${token}`, reqObj);

    dispatch({ type: 'LOADING', payload: false });

    setTimeout(() => {
      window.location.href = '/login';
    }, 500);
  } catch (error) {
    console.error(error);
    dispatch({ type: 'LOADING', payload: false });
    return {
      success: false,
      data: error.response?.data?.message || 'Reset link expired or invalid',
    };
  }
};

/**
 * LOGOUT
 */
export const userLogout = () => async (dispatch) => {
  try {
    await api.post('/user/logout');
  } finally {
    dispatch({ type: 'LOGOUT' });
    window.location.href = '/login';
  }
};

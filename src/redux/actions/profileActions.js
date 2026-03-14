import api from '../../utils/api';

// Upload profile image
export const uploadProfileImage = (file) => async (dispatch) => {
  dispatch({ type: 'PROFILE_UPLOAD_REQUEST' });

  try {
    const formData = new FormData();
    formData.append('files', file);
    formData.append('type', 'User');

    const res = await api.post('/attachment/add', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    const uploaded = res.data.data?.[0];

    dispatch({
      type: 'PROFILE_UPLOAD_SUCCESS',
      payload: uploaded,
    });

    return uploaded; // important
  } catch (err) {
    dispatch({
      type: 'PROFILE_UPLOAD_FAIL',
      payload: err.response?.data?.message || 'Upload failed',
    });
    return null;
  }
};

// Update profile
export const updateProfile = (userId, payload) => async (dispatch) => {
  dispatch({ type: 'PROFILE_UPDATE_REQUEST' });

  try {
    const res = await api.put(`/user/edit/${userId}`, payload);

    dispatch({
      type: 'PROFILE_UPDATE_SUCCESS',
      payload: res.data,
    });

    return { success: true };
  } catch (err) {
    dispatch({
      type: 'PROFILE_UPDATE_FAIL',
      payload: err.response?.data?.message || 'Update failed',
    });
    return { success: false, message: err.response?.data?.message };
  }
};

const initialState = {
  uploading: false,
  updating: false,
  uploadedFile: null,
  error: null,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PROFILE_UPLOAD_REQUEST':
      return { ...state, uploading: true };

    case 'PROFILE_UPLOAD_SUCCESS':
      return { ...state, uploading: false, uploadedFile: action.payload };

    case 'PROFILE_UPLOAD_FAIL':
      return { ...state, uploading: false, error: action.payload };

    case 'PROFILE_UPDATE_REQUEST':
      return { ...state, updating: true };

    case 'PROFILE_UPDATE_SUCCESS':
      return { ...state, updating: false };

    case 'PROFILE_UPDATE_FAIL':
      return { ...state, updating: false, error: action.payload };

    default:
      return state;
  }
};

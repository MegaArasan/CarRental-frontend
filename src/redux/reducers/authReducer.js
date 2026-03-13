const initialState = {
  user: null,
  isAuthenticated: false,
  csrfToken: null,
  loading: true,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PROFILE_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case 'LOGOUT':
      return {
        user: null,
        isAuthenticated: false,
        loading: false,
      };

    case 'SET_CSRF_TOKEN':
      return { ...state, csrfToken: action.payload };

    default:
      return state;
  }
};

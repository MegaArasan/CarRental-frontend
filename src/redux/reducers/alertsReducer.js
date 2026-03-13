const initialData = {
  loading: false,
  error: '',
};

export const alertsReducer = (state = initialData, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: action.payload,
      };

    case 'ERROR':
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

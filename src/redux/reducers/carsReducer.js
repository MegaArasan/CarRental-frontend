const initialData = {
  loading: false,
  error: null,
};
export const carsReducer = (state = initialData, action) => {
  switch (action.type) {
    case 'GET_ALL_CARS_REQUEST': {
      return { ...state, loading: action.payload };
    }

    case 'GET_ALL_CARS': {
      return {
        ...state,
        cars: action.payload,
        loading: false,
      };
    }

    case 'GET_CAR_ID': {
      return {
        ...state,
        car: action.payload,
        loading: false,
      };
    }

    case 'EXPLORE': {
      return { ...state, explore: action.payload, loading: false };
    }

    case 'GET_ALL_CARS_FAIL': {
      return { ...state, error: action.payload, loading: false };
    }

    case 'GET_ALL_MAKE_MODEL': {
      return { ...state, makeModel: action.payload, loading: false };
    }

    default:
      return state;
  }
};

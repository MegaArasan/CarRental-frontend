const initialState = {
  dashboardLoading: false,
  submittingCar: false,
  uploadingAsset: false,
  submittingOffer: false,
  deletingOfferId: null,
  reports: null,
  offers: [],
  error: null,
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADMIN_REPORTS_REQUEST':
    case 'ADMIN_OFFERS_REQUEST':
      return {
        ...state,
        dashboardLoading: true,
        error: null,
      };

    case 'ADMIN_ADD_CAR_REQUEST':
      return {
        ...state,
        submittingCar: true,
        error: null,
      };

    case 'ADMIN_UPLOAD_ASSET_REQUEST':
      return {
        ...state,
        uploadingAsset: true,
        error: null,
      };

    case 'ADMIN_SAVE_OFFER_REQUEST':
      return {
        ...state,
        submittingOffer: true,
        error: null,
      };

    case 'ADMIN_DELETE_OFFER_REQUEST':
      return {
        ...state,
        deletingOfferId: action.payload,
        error: null,
      };

    case 'ADMIN_REPORTS_SUCCESS':
      return {
        ...state,
        dashboardLoading: false,
        reports: action.payload,
      };

    case 'ADMIN_OFFERS_SUCCESS':
      return {
        ...state,
        dashboardLoading: false,
        submittingOffer: false,
        deletingOfferId: null,
        offers: action.payload,
      };

    case 'ADMIN_ADD_CAR_SUCCESS':
      return {
        ...state,
        submittingCar: false,
      };

    case 'ADMIN_UPLOAD_ASSET_SUCCESS':
      return {
        ...state,
        uploadingAsset: false,
      };

    case 'ADMIN_ADD_CAR_FAIL':
      return {
        ...state,
        submittingCar: false,
        error: action.payload,
      };

    case 'ADMIN_UPLOAD_ASSET_FAIL':
      return {
        ...state,
        uploadingAsset: false,
        error: action.payload,
      };

    case 'ADMIN_REPORTS_FAIL':
      return {
        ...state,
        dashboardLoading: false,
        error: action.payload,
      };

    case 'ADMIN_SAVE_OFFER_FAIL':
      return {
        ...state,
        submittingOffer: false,
        error: action.payload,
      };

    case 'ADMIN_DELETE_OFFER_FAIL':
      return {
        ...state,
        deletingOfferId: null,
        error: action.payload,
      };

    case 'ADMIN_OFFERS_FAIL':
      return {
        ...state,
        dashboardLoading: false,
        submittingOffer: false,
        deletingOfferId: null,
        error: action.payload,
      };

    default:
      return state;
  }
};

import api from '../../utils/api';
import { requestWithFallback } from '../../utils/requestWithFallback';
import { getAllCars } from './carsAction';

const getMessage = (error, fallback) => error.response?.data?.message || fallback;

const normalizeCollection = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.offers)) return data.offers;
  if (Array.isArray(data?.data)) return data.data;
  return [];
};

const normalizeOffer = (offer) => ({
  title: offer.title?.trim() || offer.name?.trim() || '',
  description: offer.description?.trim() || '',
  discountType: offer.discountType || 'percentage',
  discountValue: Number(offer.discountValue || 0),
  carIds: Array.isArray(offer.carIds) ? offer.carIds : [],
  isGlobal: Boolean(offer.isGlobal),
  minDays: Number(offer.minDays || 0),
  promoCode: offer.promoCode?.trim() || '',
  startDate: offer.startDate || null,
  endDate: offer.endDate || null,
  isActive: Boolean(offer.isActive),
});

export const uploadAdminAsset = (file, type = 'Car') => async (dispatch) => {
  dispatch({ type: 'ADMIN_UPLOAD_ASSET_REQUEST' });

  try {
    const formData = new FormData();
    formData.append('files', file);
    formData.append('type', type);

    const response = await api.post('/attachment/add', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    const uploaded = response.data?.data?.[0];
    const assetId = uploaded?._id || uploaded?.id || uploaded?.gridFsFileId;

    dispatch({ type: 'ADMIN_UPLOAD_ASSET_SUCCESS' });
    return {
      success: true,
      assetId,
      asset: uploaded,
    };
  } catch (error) {
    const message = getMessage(error, 'Failed to upload asset');
    dispatch({ type: 'ADMIN_UPLOAD_ASSET_FAIL', payload: message });
    return { success: false, message };
  }
};

export const fetchAdminReports = () => async (dispatch) => {
  dispatch({ type: 'ADMIN_REPORTS_REQUEST' });

  try {
    const response = await api.get('/admin/reports');

    dispatch({
      type: 'ADMIN_REPORTS_SUCCESS',
      payload: response.data?.data ?? response.data,
    });
  } catch (error) {
    dispatch({
      type: 'ADMIN_REPORTS_FAIL',
      payload: getMessage(error, 'Failed to load reports'),
    });
    return { success: false, message: getMessage(error, 'Failed to load reports') };
  }

  return { success: true };
};

export const downloadUsersReport = (format = 'xlsx') => async () => {
  try {
    const response = await api.get(`/admin/reports/users/download?format=${format}`, {
      responseType: 'blob',
    });

    const blob = new Blob([response.data], {
      type: response.headers['content-type'] || 'application/octet-stream',
    });
    const downloadUrl = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');

    anchor.href = downloadUrl;
    anchor.download = `users-report.${format}`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.URL.revokeObjectURL(downloadUrl);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: getMessage(error, 'Failed to download users report'),
    };
  }
};

export const fetchOffers = () => async (dispatch) => {
  dispatch({ type: 'ADMIN_OFFERS_REQUEST' });

  try {
    const response = await requestWithFallback([
      () => api.get('/offers'),
      () => api.get('/offers/'),
    ]);

    dispatch({
      type: 'ADMIN_OFFERS_SUCCESS',
      payload: normalizeCollection(response.data?.data ?? response.data),
    });
  } catch (error) {
    dispatch({
      type: 'ADMIN_OFFERS_FAIL',
      payload: getMessage(error, 'Failed to load offers'),
    });
    return { success: false, message: getMessage(error, 'Failed to load offers') };
  }

  return { success: true };
};

export const addCar = (carPayload) => async (dispatch) => {
  dispatch({ type: 'ADMIN_ADD_CAR_REQUEST' });

  try {
    await requestWithFallback([
      () => api.post('/cars/add', carPayload),
      () => api.post('/admin/cars', carPayload),
      () => api.post('/cars', carPayload),
    ]);

    dispatch({ type: 'ADMIN_ADD_CAR_SUCCESS' });
    dispatch(getAllCars());
    return { success: true };
  } catch (error) {
    const message = getMessage(error, 'Failed to add car');
    dispatch({ type: 'ADMIN_ADD_CAR_FAIL', payload: message });
    return { success: false, message };
  }
};

export const updateCar = (carId, carPayload) => async (dispatch) => {
  dispatch({ type: 'ADMIN_ADD_CAR_REQUEST' });

  try {
    await requestWithFallback([
      () => api.put(`/cars/edit/${carId}`, carPayload),
      () => api.put(`/admin/cars/${carId}`, carPayload),
      () => api.put(`/cars/${carId}`, carPayload),
    ]);

    dispatch({ type: 'ADMIN_ADD_CAR_SUCCESS' });
    dispatch(getAllCars());
    return { success: true };
  } catch (error) {
    const message = getMessage(error, 'Failed to update car');
    dispatch({ type: 'ADMIN_ADD_CAR_FAIL', payload: message });
    return { success: false, message };
  }
};

export const saveOffer = (offer, offerId) => async (dispatch) => {
  dispatch({ type: 'ADMIN_SAVE_OFFER_REQUEST' });

  const payload = normalizeOffer(offer);

  try {
    if (offerId) {
      await requestWithFallback([
        () => api.put(`/offers/${offerId}`, payload),
        () => api.put(`/offers/${offerId}/`, payload),
      ]);
    } else {
      await requestWithFallback([
        () => api.post('/offers', payload),
        () => api.post('/offers/', payload),
      ]);
    }

    return dispatch(fetchOffers());
  } catch (error) {
    const message = getMessage(error, 'Failed to save offer');
    dispatch({ type: 'ADMIN_SAVE_OFFER_FAIL', payload: message });
    return { success: false, message };
  }
};

export const deleteOffer = (offerId) => async (dispatch) => {
  dispatch({ type: 'ADMIN_DELETE_OFFER_REQUEST', payload: offerId });

  try {
    await requestWithFallback([
      () => api.delete(`/offers/${offerId}`),
      () => api.delete(`/offers/${offerId}/`),
    ]);

    return dispatch(fetchOffers());
  } catch (error) {
    const message = getMessage(error, 'Failed to delete offer');
    dispatch({ type: 'ADMIN_DELETE_OFFER_FAIL', payload: message });
    return { success: false, message };
  }
};

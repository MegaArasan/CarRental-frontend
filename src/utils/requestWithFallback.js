const isClientError = (status) => status >= 400 && status < 500;

export const requestWithFallback = async (requestFactories) => {
  let lastError = null;

  for (const createRequest of requestFactories) {
    try {
      return await createRequest();
    } catch (error) {
      const status = error.response?.status;
      lastError = error;

      if (status && ![404, 405].includes(status) && isClientError(status)) {
        throw error;
      }
    }
  }

  throw lastError;
};

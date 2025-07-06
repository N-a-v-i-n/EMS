import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/api/';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access')}`,
  },
});

// Handle expired access token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // if token is invalid and hasn't been retried yet
    if (
      error.response?.status === 401 &&
      error.response.data?.code === 'token_not_valid' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(`${baseURL}accounts/token/refresh/`, {
          refresh: localStorage.getItem('refresh'),
        });

        const newAccess = res.data.access;
        localStorage.setItem('access', newAccess);
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${newAccess}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccess}`;

        return axiosInstance(originalRequest)
      } catch (err) {
        console.error('Refresh token failed', err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

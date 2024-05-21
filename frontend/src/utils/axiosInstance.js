import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 20000,
  headers: {
    common: {
      Authorization: localStorage.getItem('access_token') ? 'Bearer ' + localStorage.getItem('access_token') : null,
      accept: 'application/json'
    }
  }
});

const refreshToken = async (refresh) => {
  try {
    const response = await axiosInstance.post('accounts/api/token/refresh/', { refresh: refresh });
    localStorage.setItem('access_token', response.data?.access);
    return response;
  } catch (e) {
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('access_token');
  }
};

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      const refreshToken = localStorage.getItem('refresh_token');
      const refresh = await refreshToken(refreshToken);

      originalRequest._retry = true;
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + refresh.data?.access;
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const setAxiosAuthToken = (token) => {
  if (typeof token !== 'undefined' && token) {
    axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export default axiosInstance;

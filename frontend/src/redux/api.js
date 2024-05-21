import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { authSuccess, logout, refreshToken } from './login-slice/login.slice';
import { setAxiosAuthToken } from 'utils/axiosInstance';

// import { getAPIUrl } from '../utils/Utils';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_API_URL,

  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests

    const { token } = getState().auth;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
});
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await api.dispatch(refreshToken());

    if (refreshResult.data) {
      // store the new token in the store or wherever you keep it
      api.dispatch(authSuccess(refreshResult.data));
      setAxiosAuthToken(refreshResult.data.access);
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      // refresh failed - do something like redirect to login or show a "retry" button
      api.dispatch(logout());
    }
  }
  return result;
};

const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['QueryList', 'ChartQuerys'],
  endpoints: () => ({})
});

export default api;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance, { setAxiosAuthToken } from '../../utils/axiosInstance';

export const loginUser = createAsyncThunk('auth/login', async (userData, { dispatch, rejectWithValue }) => {
  try {
    const req = await axiosInstance.post('accounts/api/token/', userData);
    const { access } = req.data;
    setAxiosAuthToken(access);
    dispatch(authSuccess(req.data));
    // dispatch(getCurrentUser());
  } catch (error) {
    console.log('first');
    dispatch(unSetCurrentUser());
    return rejectWithValue(error.response.data);
  }
});

export const authSuccess = createAsyncThunk('auth/setToken', async (token) => {
  setAxiosAuthToken(token?.access);
  localStorage.setItem('access_token', token?.access);
  localStorage.setItem('refresh_token', token?.refresh);

  return token;
});

export const getCurrentUser = createAsyncThunk(
  'auth/getUser',

  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('auth/users/me/');

      dispatch(setCurrentUser(response.data));
    } catch (error) {
      dispatch(logout());
      return rejectWithValue(error.response.data);
    }
  }
);

export const refreshToken = createAsyncThunk('auth/refreshToken', async (_, { rejectWithValue, dispatch }) => {
  try {
    const refresh = localStorage.getItem('refresh_token');
    const response = await axiosInstance.post('accounts/api/token/refresh/', { refresh: refresh });
    dispatch(authSuccess(response.data));
    return response;
  } catch (error) {
    dispatch(logout());
    return rejectWithValue(error.response.data);
  }
});

export const setCurrentUser = createAsyncThunk(
  'auth/setUser',

  async (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }
);

export const unSetCurrentUser = createAsyncThunk(
  'auth/unSetUser',

  async () => {
    setAxiosAuthToken('');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }
);

export const logout = createAsyncThunk(
  'auth/logout',

  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(unSetCurrentUser());
    } catch (error) {
      dispatch(unSetCurrentUser());
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  user: null,
  isAuthenticated: false,
  token: '',
  AuthSuccessLoading: false
};

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.token = '';
      })
      .addCase(authSuccess.pending, (state, action) => {
        state.AuthSuccessLoading = true;
      })
      .addCase(authSuccess.fulfilled, (state, action) => {
        state.token = action.payload?.access;
        state.isAuthenticated = true;
        state.error = null;
        state.loading = false;
        state.AuthSuccessLoading = false;
      })
      .addCase(setCurrentUser.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state, action) => {
        return initialState;
      })
      .addCase(unSetCurrentUser.fulfilled, (state, action) => {
        return initialState;
      });
  }
});

export default authReducer.reducer;

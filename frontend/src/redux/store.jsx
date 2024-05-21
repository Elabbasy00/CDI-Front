import React from 'react';
import { Provider } from 'react-redux';
import { authSuccess, getCurrentUser } from './login-slice/login.slice'; // new imports
import { isEmpty } from '../utils/utils'; // new imports

import { configureStore } from '@reduxjs/toolkit';
import api from './api';

import authSlice from './login-slice/login.slice';

let store;

const Root = ({ children, initialState = {} }, props) => {
  const store = configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      auth: authSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),

    devTools: process.env.NODE_ENV !== 'production'
  });
  // check localStorage

  if (!isEmpty(localStorage.getItem('access_token')) && !isEmpty(localStorage.getItem('refresh_token'))) {
    const tokens = {
      access: localStorage.getItem('access_token'),
      refresh: localStorage.getItem('refresh_token')
    };
    store.dispatch(authSuccess(tokens));
    // store.dispatch(getCurrentUser());
  }

  // if (!isEmpty(localStorage.getItem("user"))) {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   store.dispatch(setCurrentUser(user));
  // }

  return <Provider store={store}>{children}</Provider>;
};
export { store };

export default Root;

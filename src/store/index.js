import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import clientReducer from './slices/clientSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    clients: clientReducer,
  },
});

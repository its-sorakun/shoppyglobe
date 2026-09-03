// store.js: Redux store configuration. Combines slices into the root reducer and sets up middleware automatically via Redux Toolkit.
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import searchReducer from './searchSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
    auth: authReducer,
  },
});

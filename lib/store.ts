import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import viewReducer from './features/view/viewSlice';
import productsReducer from './features/products/productsSlice';
import posReducer from './features/pos/posSlice';
import authReducer from './features/auth/authSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      view: viewReducer,
      products: productsReducer,
      pos: posReducer,
      auth: authReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

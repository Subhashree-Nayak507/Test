import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice/AuthSlice';

const store = configureStore({
  reducer: {
    auth :authReducer,
  },
});

export default store;

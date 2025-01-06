import { configureStore } from '@reduxjs/toolkit';
import formReducer from './FormSlice/FormSlice';
import authReducer from './AuthSlice/AuthSlice';

const store = configureStore({
  reducer: {
    form: formReducer,
    auth :authReducer,
  },
});

export default store;

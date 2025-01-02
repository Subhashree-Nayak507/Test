import { configureStore } from '@reduxjs/toolkit';
import formReducer from './FormSlice/FormSlice';

const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

export default store;

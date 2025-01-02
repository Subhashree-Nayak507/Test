import { configureStore } from '@reduxjs/toolkit';
import formReducer from '@/store/FormSlice/FormSlice.js';

const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

export default store;

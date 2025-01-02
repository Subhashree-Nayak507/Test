import { configureStore } from '@reduxjs/toolkit';
import formReducer from '@/formSlice/formSlice';

const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

export default store;

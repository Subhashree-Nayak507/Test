import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Constants
const API_URL = 'http://localhost:5000/form';

// Initial state
const initialState = {
  formData: {
    name: '',
    email: '',
    file: null,
  },
  status: 'idle',
  error: null,
};

// Async thunk for form submission
export const submitForm = createAsyncThunk(
  'form/submitForm',
  async (formData, { rejectWithValue }) => {
    try {
      const data = new FormData();

      data.append('Name', formData.name);
      data.append('email', formData.email);
      data.append('File', formData.file);

      const response = await axios.post(API_URL, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Failed to submit form'
      );
    }
  }
);

// Slice definition
const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateForm: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetForm: (state) => {
      state.formData = initialState.formData;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitForm.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(submitForm.fulfilled, (state) => {
        state.status = 'succeeded';
        state.formData = initialState.formData;
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { updateForm, resetForm } = formSlice.actions;
export default formSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action to submit form data to the backend
export const submitForm = createAsyncThunk(
  'form/submitForm',
  async (formData, { rejectWithValue }) => {
    try {
      const data = new FormData(); 
      data.append('Name', formData.name);
      data.append('email', formData.email);
      data.append('File', formData.file);

      // API request to backend
      const response = await axios.post(`http://localhost:5000/form`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data || 'Something went wrong');
    }
  }
);

// Redux slice
const formSlice = createSlice({
  name: 'form',
  initialState: {
    formData: {
      name: '',
      email: '',
      file: null,
    },
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    updateForm: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
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
        state.formData = { name: '', email: '', file: null };
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { updateForm } = formSlice.actions;
export default formSlice.reducer;

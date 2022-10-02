import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tftService from './tftService';

const initialState = {
  data: '',
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

export const getTft = createAsyncThunk('tft/getTft', async (name, thunkAPI) => {
  try {
    // const token = thunkAPI.getState().auth.user.token
    console.log(name);
    return await tftService.getTft(name);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const tftSlice = createSlice({
  name: 'tft',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTft.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTft.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(getTft.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
      });
  }
});

export const { reset } = tftSlice.actions;
export default tftSlice.reducer;

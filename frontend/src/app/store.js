import { configureStore } from '@reduxjs/toolkit';

import tftReducer from '../features/tft/tftSlice';
export const store = configureStore({
  reducer: {
    tft: tftReducer
  }
});

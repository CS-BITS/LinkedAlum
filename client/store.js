import { configureStore } from '@reduxjs/toolkit';
import feedReducer from './slices/feedSlice';

export default configureStore({
  reducer: {
    feedData: feedReducer,
  },
});

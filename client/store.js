import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import feedReducer from './slices/feedSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    feedData: feedReducer,
  },
});

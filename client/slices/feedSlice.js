import { createSlice } from '@reduxjs/toolkit';

export const feedSlice = createSlice({
  name: 'feedData',
  initialState: {
    value: [],
  },
  reducers: {
    setFeed: (state, action) => {
      state.value = action.payload;
    },
    addToFeed: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { setFeed, addToFeed } = feedSlice.actions;
export default feedSlice.reducer;

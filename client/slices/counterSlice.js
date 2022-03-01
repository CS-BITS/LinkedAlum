import { createSlice } from '@reduxjs/toolkit';

/*
slice is basically how you initialize the state for whichever functionality/component you want
*/
export const counterSlice = createSlice({
  //name to access the slice
  name: 'counter',
  //initializing the default state
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});
// Action creators are generated for each case reducer function, export these to use in components
export const { increment, decrement, incrementBy } = counterSlice.actions;
//export the reducers as default to include in the store
export default counterSlice.reducer;

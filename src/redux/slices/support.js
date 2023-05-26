import { createSlice } from "@reduxjs/toolkit";

export const supportSlice = createSlice({
  name: "support",
  initialState: {
    supports: [],
  },
  reducers: {
    setSupport: (state, action) => {
      state.supports = action.payload;
    },
  },
});

export const { setSupport } = supportSlice.actions;

export default supportSlice.reducer;

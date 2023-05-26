import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admins: [],
  },
  reducers: {
    setAdmins: (state, action) => {
      state.admins = action.payload;
    },
  },
});

export const { setAdmins } = adminSlice.actions;

export default adminSlice.reducer;

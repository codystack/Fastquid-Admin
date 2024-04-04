import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admins: [],
    allAdmins: [],
  },
  reducers: {
    setAdmins: (state, action) => {
      state.admins = action.payload;
    },
    setAllAdmins: (state, action) => {
      state.allAdmins = action.payload;
    },
  },
});

export const { setAdmins, setAllAdmins } = adminSlice.actions;

export default adminSlice.reducer;

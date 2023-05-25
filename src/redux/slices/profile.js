import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileData: null,
  },
  reducers: {
    setProfile: (state, action) => {
      state.profileData = action.payload;
    },
  },
});

export const { setOrdersData } = profileSlice.actions;

export default profileSlice.reducer;
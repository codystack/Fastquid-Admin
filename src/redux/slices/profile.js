import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileData: null,
    isAuth: false,
  },
  reducers: {
    setProfile: (state, action) => {
      state.profileData = action.payload;
    },
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
  },
});

export const { setProfile, setAuth } = profileSlice.actions;

export default profileSlice.reducer;

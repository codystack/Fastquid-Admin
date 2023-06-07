import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
  name: "setting",
  initialState: {
    settings: {},
    currentTab: 0,
  },
  reducers: {
    setSettings: (state, action) => {
      state.settings = action.payload;
    },
    setTab: (state, action) => {
      state.currentTab = action.payload;
    },
  },
});

export const { setSettings, setTab } = settingsSlice.actions;

export default settingsSlice.reducer;

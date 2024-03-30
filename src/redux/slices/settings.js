import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
  name: "setting",
  initialState: {
    settings: {},
    currentTab: 0,
    emailTemplates: [],
  },
  reducers: {
    setSettings: (state, action) => {
      state.settings = action.payload;
    },
    setEmailTemplate: (state, action) => {
      state.emailTemplates = action.payload;
    },
    setTab: (state, action) => {
      state.currentTab = action.payload;
    },
  },
});

export const { setSettings, setTab, setEmailTemplate } = settingsSlice.actions;

export default settingsSlice.reducer;

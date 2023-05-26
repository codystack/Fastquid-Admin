import { createSlice } from "@reduxjs/toolkit";

export const loanSlice = createSlice({
  name: "loan",
  initialState: {
    loans: [],
    recentLoans: [],
  },
  reducers: {
    setLoans: (state, action) => {
      state.loans = action.payload;
    },
    setRecentLoans: (state, action) => {
      state.recentLoans = action.payload;
    },
  },
});

export const { setLoans, setRecentLoans } = loanSlice.actions;

export default loanSlice.reducer;

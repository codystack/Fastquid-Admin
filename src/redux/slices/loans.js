import { createSlice } from "@reduxjs/toolkit";

export const loanSlice = createSlice({
  name: "loan",
  initialState: {
    loans: [],
    loanRequests: [],
    recentLoans: [],
  },
  reducers: {
    setLoans: (state, action) => {
      state.loans = action.payload;
    },
    setLoanRequests: (state, action) => {
      state.loanRequests = action.payload;
    },
    setRecentLoans: (state, action) => {
      state.recentLoans = action.payload;
    },
  },
});

export const { setLoans, setRecentLoans, setLoanRequests } = loanSlice.actions;

export default loanSlice.reducer;

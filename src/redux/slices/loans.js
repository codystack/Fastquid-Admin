import { createSlice } from "@reduxjs/toolkit";

export const loanSlice = createSlice({
  name: "loan",
  initialState: {
    loans: [],
    loanRequests: [],
    recentLoans: [],
    approvedLoans: [],
    disbursedLoans: [],
    declinedLoans: [],
    pendingLoans: [],
    settledLoans: [],
    alltimeSettledLoans: [],
    alltimeCreditedLoans: [],
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
    setApprovedLoans: (state, action) => {
      state.approvedLoans = action.payload;
    },
    setPendingLoans: (state, action) => {
      state.pendingLoans = action.payload;
    },
    setDisbursedLoans: (state, action) => {
      state.disbursedLoans = action.payload;
    },
    setDeclinedLoans: (state, action) => {
      state.declinedLoans = action.payload;
    },
    setSettledLoans: (state, action) => {
      state.settledLoans = action.payload;
    },
    setAlltimeSettledLoans: (state, action) => {
      state.alltimeSettledLoans = action.payload;
    },
    setAlltimeCreditedLoans: (state, action) => {
      state.alltimeCreditedLoans = action.payload;
    },
  },
});

export const {
  setLoans,
  setRecentLoans,
  setLoanRequests,
  setPendingLoans,
  setApprovedLoans,
  setDisbursedLoans,
  setDeclinedLoans,
  setSettledLoans,
  setAlltimeCreditedLoans,
  setAlltimeSettledLoans,
} = loanSlice.actions;

export default loanSlice.reducer;

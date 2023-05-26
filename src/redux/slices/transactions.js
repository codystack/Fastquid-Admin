import { createSlice } from "@reduxjs/toolkit";

export const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transactions: [],
    recentTransactions: [],
  },
  reducers: {
    setTransaction: (state, action) => {
      state.transactions = action.payload;
    },
    setRecentTransaction: (state, action) => {
      state.recentTransactions = action.payload;
    },
  },
});

export const { setTransaction, setRecentTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;

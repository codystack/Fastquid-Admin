import { createSlice } from "@reduxjs/toolkit";

export const cardSlice = createSlice({
  name: "card",
  initialState: {
    cards: [],
  },
  reducers: {
    setDebitCards: (state, action) => {
      state.cards = action.payload;
    },
  },
});

export const { setDebitCards } = cardSlice.actions;

export default cardSlice.reducer;

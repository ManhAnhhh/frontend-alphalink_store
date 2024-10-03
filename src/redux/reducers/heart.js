import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: null,
};

export const heartCustomerSlice = createSlice({
  name: "heartCustomer",
  initialState,
  reducers: {
    updateHeart: (state, action) => {
      state.items = action.payload;
    },
    clearHeart: (state, action) => {
      state.items = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateHeart, clearHeart } = heartCustomerSlice.actions;

export default heartCustomerSlice.reducer;

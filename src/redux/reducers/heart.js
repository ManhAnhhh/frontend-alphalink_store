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
  },
});

// Action creators are generated for each case reducer function
export const { updateHeart } = heartCustomerSlice.actions;

export default heartCustomerSlice.reducer;

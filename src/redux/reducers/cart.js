import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: null,
};

export const cartCustomerSlice = createSlice({
  name: "cartCustomer",
  initialState,
  reducers: {
    updateCart: (state, action) => {
      state.items = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateCart } = cartCustomerSlice.actions;

export default cartCustomerSlice.reducer;

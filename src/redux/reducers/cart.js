import { createSlice } from "@reduxjs/toolkit";
import { HandlePriceWithDiscount } from "../../share/utilities";

const initialState = {
  cart: {
    items: [],
    totalPriceInCart: 0,
    deleveryPrice: 0,
  },
};

export const cartCustomerSlice = createSlice({
  name: "cartCustomer",
  initialState,
  reducers: {
    updateCart: (state, action) => {
      state.cart.items = action.payload;
      const totalPriceInCart = action.payload
        ?.reduce(
          (total, item) =>
            total +
            HandlePriceWithDiscount(item.price, item.discount) * item.qty,
          0
        )
        .toFixed(2);
      state.cart.totalPriceInCart = parseFloat(totalPriceInCart);
      let deleveryPrice;
      if (action.payload.length === 0) {
        deleveryPrice = 0;
      } else if (action.payload.length > 3) {
        deleveryPrice = 0;
      } else {
        deleveryPrice = process.env.REACT_APP_DELEVERY_PRICE || 15;
      }

      state.cart.deleveryPrice = parseInt(deleveryPrice);
    },
    clearCart: (state, action) => {
      state.cart.items = [];
      state.cart.totalPriceInCart = 0;
      state.cart.deleveryPrice = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateCart, clearCart } = cartCustomerSlice.actions;

export default cartCustomerSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: {
    isLoggedIn: false,
    currentCustomer: null,
  },
};

export const authCustomerSlice = createSlice({
  name: "authCustomer",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.login.isLoggedIn = true;
      state.login.currentCustomer = action.payload;
    },
    loggedOut: (state, action) => {
      state.login.isLoggedIn = false;
      state.login.currentCustomer = null;
    },
    loginFalse: (state, action) => {
      state.login.isLoggedIn = false;
      state.login.currentCustomer = null;
    },
    updateCurrentCustomer: (state, action) => {
      state.login.currentCustomer.fullName = action.payload.fullName;
      state.login.currentCustomer.email = action.payload.email;
      state.login.currentCustomer.phone = action.payload.phone;
      state.login.currentCustomer.address = action.payload.address;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginSuccess, loggedOut, loginFalse, updateCurrentCustomer } =
  authCustomerSlice.actions;

export default authCustomerSlice.reducer;

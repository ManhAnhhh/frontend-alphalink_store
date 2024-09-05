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
  },
});

// Action creators are generated for each case reducer function
export const { loginSuccess, loggedOut, loginFalse } =
  authCustomerSlice.actions;

export default authCustomerSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import auth from "./reducers/auth";
import cart from "./reducers/cart";

// dùng react-persist để lưu dữ liệu vào store sau khi refresh lại trang thì không mất dữ liệu
// trừ khi dispatch(loggerOut())
const persistConfig = {
  key: "alphalink_store",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, auth);
const persistedCartReducer = persistReducer(persistConfig, cart);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    cart: persistedCartReducer,
  },
});

export const persistor = persistStore(store);

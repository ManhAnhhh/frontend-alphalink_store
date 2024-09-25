import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./reducers/auth";
import cartReducer from "./reducers/cart";
import heartReducer from "./reducers/heart";
import filterProduct from "./reducers/filterProduct";

// dùng react-persist để lưu dữ liệu vào store sau khi refresh lại trang thì không mất dữ liệu
// trừ khi dispatch(loggerOut())

const cartPersistConfig = {
  key: "Cart",
  storage,
};

const heartPersistConfig = {
  key: "Heart",
  storage,
};

const authPersistConfig = {
  key: "Auth",
  storage,
};

const rootReducer = combineReducers({
  Auth: persistReducer(authPersistConfig, authReducer),
  Cart: persistReducer(cartPersistConfig, cartReducer),
  Heart: persistReducer(heartPersistConfig, heartReducer),
  FilterPrd: filterProduct,
});
// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

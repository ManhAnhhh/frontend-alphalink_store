import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import auth from "./reducers/auth";

const persistConfig = {
  key: 'alphalink_store',
  storage,
}

const persistedAuthReducer = persistReducer(persistConfig, auth)

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
});

export const persistor = persistStore(store);

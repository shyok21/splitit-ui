import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./users";

const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: "root", // Key for the persisted state in storage
  storage, // Storage engine (e.g., localStorage)
  safelist: ["user"], // Array of reducers to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

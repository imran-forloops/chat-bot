import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import configSlice from "./features/configSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const authConfig = {
  key: "auth",
  storage,
};

const llmConfig = {
  key: "config",
  storage,
};

const rootConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authConfig, authSlice),
  config: persistReducer(llmConfig, configSlice),
});

const persistedReducer = persistReducer(rootConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store };

import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./slices/UserApi";
import userReducer from "./slices/UserSlice";
import { stComplaintApi } from "./slices/StComplaintApi";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [stComplaintApi.reducerPath]: stComplaintApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware,stComplaintApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

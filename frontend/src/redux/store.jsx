import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./slices/UserApi";
import userReducer from "./slices/UserSlice";
import { stComplaintApi } from "./slices/StComplaintApi";
import { submittedFormApi } from "./slices/SubmittedFormsApi";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [stComplaintApi.reducerPath]: stComplaintApi.reducer,
    [submittedFormApi.reducerPath]: submittedFormApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, stComplaintApi.middleware, submittedFormApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

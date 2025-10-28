import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./slices/UserApi";
import userReducer from "./slices/UserSlice";
import { stComplaintApi } from "./slices/StComplaintApi";
import { submittedFormApi } from "./slices/SubmittedFormsApi";
import { VisitorApi } from "./slices/VisitorApi";
import { RegistrationApi } from "./slices/RegistrationApi";
import { teacherComplaintApi } from "./slices/TeacherComplaints";
import languageReducer from "./slices/languageSlice";
import { departmentApi } from "./slices/DepartmentApi";
import { parentComplaintApi } from "./slices/ParentComplaintApi";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [stComplaintApi.reducerPath]: stComplaintApi.reducer,
    [submittedFormApi.reducerPath]: submittedFormApi.reducer,
    [VisitorApi.reducerPath]: VisitorApi.reducer,
    [RegistrationApi.reducerPath]: RegistrationApi.reducer,
    [teacherComplaintApi.reducerPath]: teacherComplaintApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [parentComplaintApi.reducerPath]: parentComplaintApi.reducer,
    [BookApi.reducerPath]: BookApi.reducer,
    user: userReducer,
    language: languageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, stComplaintApi.middleware, submittedFormApi.middleware, VisitorApi.middleware, RegistrationApi.middleware, teacherComplaintApi.middleware, departmentApi.middleware, parentComplaintApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

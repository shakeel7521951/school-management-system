import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const departmentApi = createApi({
  reducerPath: "departmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.user?.profile?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["Department"], // helps with cache invalidation
  endpoints: (builder) => ({
    // 🟢 Create Department
    createDepartment: builder.mutation({
      query: (data) => ({
        url: "/create-department",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Department"],
    }),

    // 🔵 Get All Departments
    getAllDepartments: builder.query({
      query: () => "/all-departments",
      providesTags: ["Department"],
    }),

    // 🟠 Edit Department
    editDepartment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/edit-department/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Department"],
    }),

    // 🔴 Delete Department
    deleteDepartment: builder.mutation({
      query: (id) => ({
        url: `/delete-department/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Department"],
    }),
  }),
});

export const {
  useCreateDepartmentMutation,
  useGetAllDepartmentsQuery,
  useEditDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentApi;

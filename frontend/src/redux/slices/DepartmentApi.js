// src/redux/api/departmentApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const departmentApi = createApi({
  reducerPath: "departmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.user?.profile?.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
    credentials: "include",
  }),

  endpoints: (builder) => ({
    // GET ALL
    getDepartments: builder.query({
      query: () => `/all-departments`,
      providesTags: ["Departments"],
    }),
    // GET department complaints
    getDepartmentComplaints: builder.query({
      query: () => `/departmentComplaints`,
      providesTags: ["Departments"],
    }),

    getTeacherDepartmentComplaints: builder.query({
      query: () => `/department-teacher-complaints`,
      providesTags: ["Departments"],
    }),

    // CREATE
    createDepartment: builder.mutation({
      query: (body) => ({
        url: `/create-department`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Departments"],
    }),

    // UPDATE
    updateDepartment: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/edit-department/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Departments"],
    }),

    // DELETE
    deleteDepartment: builder.mutation({
      query: (id) => ({
        url: `/delete-department/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Departments"],
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
  useGetDepartmentComplaintsQuery,
  useGetTeacherDepartmentComplaintsQuery,
} = departmentApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const teacherComplaintApi = createApi({
  reducerPath: "teacherComplaintApi",
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
  tagTypes: ["TeacherComplaint"],

  endpoints: (builder) => ({
    // ✅ Create new complaint
    createComplaint: builder.mutation({
      query: (data) => ({
        url: "/create-teacher-complaint",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["TeacherComplaint"],
    }),

    // ✅ Get all complaints
    getComplaints: builder.query({
      query: () => "/get-teacher-complaints",
      providesTags: ["TeacherComplaint"],
    }),

    // ✅ Get complaint by ID
    getComplaintById: builder.query({
      query: (id) => `/get-teacher-complaint/${id}`,
      providesTags: ["TeacherComplaint"],
    }),

    // ✅ Update full complaint
    updateComplaint: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/update-teacher-complaint/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["TeacherComplaint"],
    }),

    // ✅ Update only status
    updateComplaintStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/update-teacher-complaint-status/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["TeacherComplaint"],
    }),

    // ✅ Delete complaint
    deleteComplaint: builder.mutation({
      query: (id) => ({
        url: `/delete-teacher-complaint/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TeacherComplaint"],
    }),
  }),
});

// ✅ Export hooks
export const {
  useCreateComplaintMutation,
  useGetComplaintsQuery,
  useGetComplaintByIdQuery,
  useUpdateComplaintMutation,
  useUpdateComplaintStatusMutation,
  useDeleteComplaintMutation,
} = teacherComplaintApi;

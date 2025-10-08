import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const stComplaintApi = createApi({
  reducerPath: "stComplaintApi",
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

  tagTypes: ["StComplaint"],

  endpoints: (builder) => ({

    // Create Complaint
    createStComplaint: builder.mutation({
      query: (data) => ({
        url: "/create-st-complaint",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["StComplaint"],
    }),

    // Get All Complaints
    getAllStComplaints: builder.query({
      query: () => ({
        url: "/get-all-st-complaints",
        method: "GET",
      }),
      providesTags: ["StComplaint"],
    }),

    // Get Single Complaint
    getStComplaintById: builder.query({
      query: (id) => ({
        url: `/simple-st-complaint/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["StComplaint"],
    }),

    // Delete Complaint
    deleteStComplaint: builder.mutation({
      query: (id) => ({
        url: `/delete-st-complaint/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["StComplaint"],
    }),

    changeStComplaintStatus: builder.mutation({
      query: ({ id, status ,assignedTo}) => ({
        url: `/st-complaint-status/${id}`,
        method: "PATCH",
        body: { status,assignedTo },
      }),
      invalidatesTags: ["StComplaint"],
    }),

  }),
});

export const {
  useCreateStComplaintMutation,
  useGetAllStComplaintsQuery,
  useGetStComplaintByIdQuery,
  useDeleteStComplaintMutation,
  useChangeStComplaintStatusMutation,
} = stComplaintApi;

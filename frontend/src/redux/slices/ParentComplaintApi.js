import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const parentComplaintApi = createApi({
  reducerPath: "parentComplaintApi",
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

  tagTypes: ["ParentComplaint"],

  endpoints: (builder) => ({
    createParentComplaint: builder.mutation({
      query: (data) => ({
        url: "/create-parent-complaint",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ParentComplaint"],
    }),

    getAllParentComplaints: builder.query({
      query: () => ({
        url: "/all-parent-complaints",
        method: "GET",
      }),
      providesTags: ["ParentComplaint"],
    }),

    deleteParentComplaint: builder.mutation({
      query: (id) => ({
        url: `/delete-parent-complaint/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ParentComplaint"],
    }),

    changeParentComplaintStatus: builder.mutation({
      query: ({ id, status,assignedTo }) => ({
        url: `/update-parent-complaint-status/${id}`,
        method: "PUT",
        body: { status,assignedTo },
      }),
      invalidatesTags: ["ParentComplaint"],
    }),
  }),
});

export const {
  useCreateParentComplaintMutation,
  useGetAllParentComplaintsQuery,
  useDeleteParentComplaintMutation,
  useChangeParentComplaintStatusMutation,
} = parentComplaintApi;

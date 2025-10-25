import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const VisitorApi = createApi({
  reducerPath: "visitorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.user?.profile?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Visitor"],

  endpoints: (builder) => ({
    // Add Visitor
    addVisitor: builder.mutation({
      query: (data) => ({
        url: "/add-visitor",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Visitor"],
    }),

    // Get All Visitors
    getVisitors: builder.query({
      query: () => "/get-visitors",
      providesTags: ["Visitor"],
    }),

    // Get Visitor By ID
    getVisitorById: builder.query({
      query: (id) => `/get-visitor-by-id/${id}`,
      providesTags: ["Visitor"],
    }),

    // Update Visitor Status
    updateVisitorStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/update-visitor-status/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Visitor"],
    }),

    // Delete Visitor
    deleteVisitor: builder.mutation({
      query: (id) => ({
        url: `/delete-visitor/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Visitor"],
    }),
  }),
});

export const {
  useAddVisitorMutation,
  useGetVisitorsQuery,
  useGetVisitorByIdQuery,
  useUpdateVisitorStatusMutation,
  useDeleteVisitorMutation,
} = VisitorApi;

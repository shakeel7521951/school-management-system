import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const RegistrationApi = createApi({
  reducerPath: "registrationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}`,
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
  tagTypes: ["Registration"],

  endpoints: (builder) => ({
    // Create new registration
    createRegistration: builder.mutation({
      query: (data) => ({
        url: "/create-new-registration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Registration"],
    }),

    // Get all registrations
    getRegistrations: builder.query({
      query: () => "/get-all-registrations",
      providesTags: ["Registration"],
    }),

    // Get single registration by ID
    getRegistrationById: builder.query({
      query: (id) => `/get-single-registration/${id}`,
      providesTags: ["Registration"],
    }),

    // Update registration status
    updateRegistrationStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/update-registration-status/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Registration"],
    }),

    // Delete registration
    deleteRegistration: builder.mutation({
      query: (id) => ({
        url: `/delete-registration/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Registration"],
    }),
  }),
});

export const {
  useCreateRegistrationMutation,
  useGetRegistrationsQuery,
  useGetRegistrationByIdQuery,
  useUpdateRegistrationStatusMutation,
  useDeleteRegistrationMutation,
} = RegistrationApi;

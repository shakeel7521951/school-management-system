import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { submissionsApprovedByDepartment } from "../../../../backend/controllers/FormSubmissionController";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const submittedFormApi = createApi({
  reducerPath: "submittedFormApi",
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
  tagTypes: ["Submissions"],

  endpoints: (builder) => ({
    allSubmittedForms: builder.query({
      query: (formId) => ({
        url: formId ? `/submissions?formId=${formId}` : "/submissions",
        method: "GET",
      }),
      providesTags: ["Submissions"],
    }),

    //  Submit a form
    submitForm: builder.mutation({
      query: (formData) => ({
        url: "/submit",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Submissions"],
    }),

    // Update submission status (approve/reject/etc.)
    updateSubmissionStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/submissions/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Submissions"],
    }),

    submissionsApprovedByDepartment: builder.query({
      query: () => ({
        url: `/submissions/approvedByDepartment`,
        method: "GET",
      }),
      providesTags: ["Submissions"],
    }),

  }),
});

// Export hooks
export const {
  useAllSubmittedFormsQuery,
  useSubmitFormMutation,
  useUpdateSubmissionStatusMutation,
  useSubmissionsApprovedByDepartmentQuery,
} = submittedFormApi;

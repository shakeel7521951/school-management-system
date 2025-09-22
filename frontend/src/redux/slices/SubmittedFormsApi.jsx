import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const submittedFormApi = createApi({
  reducerPath: "submittedFormApi",
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL }),
  tagTypes: ["Submissions"],

  endpoints: (builder) => ({
    // ✅ Get all submissions (optionally filter by formId)
    allSubmittedForms: builder.query({
      query: (formId) => ({
        url: formId ? `/submissions?formId=${formId}` : "/submissions",
        method: "GET",
      }),
      providesTags: ["Submissions"],
    }),

    // ✅ Submit a form
    submitForm: builder.mutation({
      query: (formData) => ({
        url: "/submit",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Submissions"],
    }),

    // ✅ Update submission status (approve/reject/etc.)
    updateSubmissionStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/submissions/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Submissions"],
    }),
  }),
});

// ✅ Export hooks
export const {
  useAllSubmittedFormsQuery,
  useSubmitFormMutation,
  useUpdateSubmissionStatusMutation,
} = submittedFormApi;

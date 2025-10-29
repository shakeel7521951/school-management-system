import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const bookApi = createApi({
    reducerPath: 'bookApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}`,
        prepareHeaders: (headers, { getState }) => {
            const token = getState()?.user?.profile?.token;
            if (token) headers.set("Authorization", `Bearer ${token}`);
            return headers;
        },
        credentials: "include",
    }),

    endpoints: (builder) => ({
        // GET ALL
        getBooks: builder.query({
            query: () => `/get-all-books`,
            providesTags: ['Books'],
        }),

        // GET BY ID
        getBookById: builder.query({
            query: (id) => `/books/${id}`,
            providesTags: ['Books'],
        }),
        // CREATE
        createBook: builder.mutation({
            query: (body) => ({
                url: `/create-book`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Books'],
        }),
        // UPDATE
        updateBook: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/books/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Books'],
        }),
        // DELETE
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/books/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Books'],
        }),
    }),
});

export const {
    useGetBooksQuery,
    useGetBookByIdQuery,
    useCreateBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation,
} = bookApi;
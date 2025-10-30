import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
    reducerPath: "blogApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BACKEND_URL,
    }),
    endpoints: (builder) => ({

        getAllBlogs: builder.query({
            query: () => ({
                url: "/get-all-blogs",
                method: "GET",
            }),
        }),

        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `/delete-blog/${id}`,
                method: "DELETE",
            }),
        }),
        getBlogById: builder.query({
            query: (id) => ({
                url: `/get-blog/${id}`,
                method: "GET",
            }),
        }),
    }),
});
export const { useGetAllBlogsQuery , useDeleteBlogMutation,useGetBlogByIdQuery} = blogApi;

import { BLOGS_URL } from '../contstants'
import { apiSlice } from './apiSlice'

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all posts
    getPosts: builder.query({
      query: () => ({
        url: `${BLOGS_URL}`, // Send search query to filter posts
      }),
      providesTags: ['Blog'],
    }),

    // Fetch a single post by its ID
    getPostById: builder.query({
      query: (blogId) => `${BLOGS_URL}/${blogId}`,
    }),

    // Add a new post
    addPost: builder.mutation({
      query: (data) => ({
        url: BLOGS_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Blog'],
    }),

    // Update an existing post
    updatePost: builder.mutation({
      query: (data) => ({
        url: `${BLOGS_URL}/${data.id}`, // Ensure `blogId` is passed correctly here
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Blog'],
    }),

    // Delete a post
    deletePost: builder.mutation({
      query: (blogId) => ({
        url: `${BLOGS_URL}/${blogId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Blog'],
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useUploadPostImageMutation,
} = postsApiSlice

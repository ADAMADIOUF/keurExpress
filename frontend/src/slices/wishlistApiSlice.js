import { WISHLIST_URL } from '../contstants'
import { apiSlice } from './apiSlice'

export const wishlistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => ({
        url: WISHLIST_URL,
      }),
      providesTags: ['Wishlist'],
      keepUnusedDataFor: 5,
    }),
    addToWishlist: builder.mutation({
      query: (propertieId) => ({
        url: `${WISHLIST_URL}`,
        method: 'POST',
        body: { propertieId },
      }),
      invalidatesTags: ['Wishlist'],
    }),
    removeFromWishlist: builder.mutation({
      query: (propertieId) => ({
        url: `${WISHLIST_URL}/${propertieId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Wishlist'],
    }),
    clearWishlist: builder.mutation({
      query: () => ({
        url: WISHLIST_URL,
        method: 'DELETE',
      }),
      invalidatesTags: ['Wishlist'],
    }),
    checkWishlist: builder.query({
      query: (propertieId) => ({
        url: `${WISHLIST_URL}/check/${propertieId}`,
        method: 'GET',
      }),
      providesTags: ['Wishlist'],
    }),
  }),
})

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useClearWishlistMutation,
  useCheckWishlistQuery,
} = wishlistApiSlice

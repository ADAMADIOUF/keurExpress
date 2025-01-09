import { PARTNER_URL } from '../contstants'
import { apiSlice } from './apiSlice'

export const partnerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all partners
    getPartners: builder.query({
      query: () => ({
        url: `${PARTNER_URL}`,
      }),
      providesTags: ['Partner'],
    }),

    // Fetch a single partner by ID
    getPartnerById: builder.query({
      query: (partnerId) => ({
        url: `${PARTNER_URL}/${partnerId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    // Add multiple partners (bulk creation)
    createPartners: builder.mutation({
      query: (data) => ({
        url: `${PARTNER_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Partner'],
    }),

    // Update a partner by ID
    updatePartner: builder.mutation({
      query: (data) => ({
        url: `${PARTNER_URL}/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Partner', id }],
    }),

    // Delete a partner by ID
    deletePartner: builder.mutation({
      query: (partnerId) => ({
        url: `${PARTNER_URL}/${partnerId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Partner', id }],
    }),
  }),
})

export const {
  useGetPartnersQuery,
  useGetPartnerByIdQuery,
  useCreatePartnersMutation,
  useUpdatePartnerMutation,
  useDeletePartnerMutation,
} = partnerApiSlice

import { PROPERTIES_URL } from '../contstants'
import { apiSlice } from './apiSlice'

export const propertieApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProperies: builder.query({
      query: ({
        keyword,
        location,
        address,
        propertyType,
        minPrice,
        maxPrice,
      }) => ({
        url: `${PROPERTIES_URL}`,
        params: {
          keyword,
          location,
          address,
          propertyType,
          minPrice,
          maxPrice,
        },
      }),
      providesTags: ['Propertie'],
    }),

    // Fetch a single property by its ID
    getPropertieById: builder.query({
      query: (propertieId) => `${PROPERTIES_URL}/${propertieId}`,
    }),

    addPropertie: builder.mutation({
      query: (data) => ({
        url: PROPERTIES_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Propertie'],
    }),

    updatePropertie: builder.mutation({
      query: (data) => ({
        url: `${PROPERTIES_URL}/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Propertie'],
    }),

    deletePropertie: builder.mutation({
      query: (id) => ({
        url: `${PROPERTIES_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Propertie'],
    }),
  }),
})

export const {
  useGetProperiesQuery,
  useGetPropertieByIdQuery,
  useAddPropertieMutation,
  useUpdatePropertieMutation,
  useDeletePropertieMutation,
} = propertieApiSlice

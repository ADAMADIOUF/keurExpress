import { CONTACT_URL, MESSAGE_URL } from '../contstants'
import { apiSlice } from './apiSlice'

export const contactApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendContactForm: builder.mutation({
      query: (data) => ({
        url: CONTACT_URL,
        method: 'POST',
        body: data,
      }),
    }),
    fetchMessages: builder.query({
      query: () => ({
        url: MESSAGE_URL,
        method: 'GET',
      }),
    }),
  }),
})

export const { useSendContactFormMutation, useFetchMessagesQuery } =
  contactApiSlice

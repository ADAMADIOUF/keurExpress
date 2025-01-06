import { CONTACT_URL, MESSAGE_URL,TRANSLATION_URL } from '../contstants'
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
    sendMessage: builder.mutation({
      query: ({ propertyId, messageData }) => ({
        url: `${MESSAGE_URL}/properties/${propertyId}/contact`,
        method: 'POST',
        body: messageData,
      }),
    }),
    translateText: builder.mutation({
      query: ({ text, targetLanguage }) => ({
        url: TRANSLATION_URL,
        method: 'POST',
        body: { text, targetLanguage },
      }),
    }),
  }),
})

export const {
  useSendContactFormMutation,
  useSendMessageMutation,
  useTranslateTextMutation,
} = contactApiSlice


import { AGENTS_URL } from '../contstants'
import { apiSlice } from './apiSlice'

export const agentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all agents
    getAgents: builder.query({
      query: () => ({
        url: `${AGENTS_URL}`,
      }),
      providesTags: ['Agent'],
    }),

    // Fetch a single agent by ID
    getAgentById: builder.query({
      query: (agentId) => ({
        url: `${AGENTS_URL}/${agentId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    // Add a new agent
    addAgent: builder.mutation({
      query: (data) => ({
        url: AGENTS_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Agent'],
    }),

    // Update an agent by ID
    updateAgent: builder.mutation({
      query: (data) => ({
        url: `${AGENTS_URL}/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Agent', id }],
    }),

    // Delete an agent by ID
    deleteAgent: builder.mutation({
      query: (id) => ({
        url: `${AGENTS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Agent', id }],
    }),
  }),
})

export const {
  useGetAgentsQuery,
  useGetAgentByIdQuery,
  useAddAgentMutation,
  useUpdateAgentMutation,
  useDeleteAgentMutation,
} = agentApiSlice

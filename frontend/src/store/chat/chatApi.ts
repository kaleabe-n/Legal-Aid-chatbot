import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const url = "http://localhost:8000";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (message) => ({
        url: `/api/message`,
        method: "POST",
        body: { content: message },
      }),
    }),
    getConversations: builder.query({
      query: () => `/api/message`,
    }),
  }),
});

export const { useSendMessageMutation, useGetConversationsQuery } = chatApi;

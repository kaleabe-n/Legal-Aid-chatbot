import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginFormProps } from "../../../types/LoginForm";

const url = "http://localhost:8000";

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginFormProps, any>({
        query: (data) => ({
          url: `/api/token/`,
          method: 'POST',
          body: data,
        })
      }),
  }),
});

export const { useLoginMutation } = loginApi;

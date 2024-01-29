import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, UserCredential } from "../../../types/signup-form";

const authApi = createApi({
  reducerPath: "auth-api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/user/" }),
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: (user: User) => ({
        url: "register/",
        method: "POST",
        body: user,
      }),
    }),
    verifyEmail: build.mutation({
      query: (userCredential: UserCredential) => ({
        url: "verify/",
        method: "POST",
        body: userCredential,
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useVerifyEmailMutation } = authApi;
export default authApi;

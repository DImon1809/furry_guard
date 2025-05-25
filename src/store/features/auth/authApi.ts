import type { RegisterType } from "@/models/AuthTypes";
import { serviceApi } from "@/store/serviceApi";

export const authApi = serviceApi.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation<string, RegisterType>({
      query: data => ({
        url: "/auth/signup",
        method: "post",
        body: data,
        responseHandler: response => response.text(),
      }),
    }),

    login: builder.mutation<
      string,
      {
        email: string;
        password: string;
      }
    >({
      query: data => ({
        url: "/auth/login",
        method: "post",
        body: data,
        responseHandler: response => response.text(),
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;

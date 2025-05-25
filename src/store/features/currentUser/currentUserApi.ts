import type { CurrentUser } from "@/models/CurrentUser";
import { serviceApi } from "@/store/serviceApi";

export const currentUserApi = serviceApi.injectEndpoints({
  endpoints: builder => ({
    current: builder.query<CurrentUser, void>({
      query: () => ({
        url: "/user",
        method: "get",
      }),
    }),
  }),
});

export const { useLazyCurrentQuery } = currentUserApi;

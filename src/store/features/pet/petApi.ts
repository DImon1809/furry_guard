import type { Pet } from "@/models/Pet";
import { serviceApi } from "@/store/serviceApi";

export const petApi = serviceApi.injectEndpoints({
  endpoints: builder => ({
    addPet: builder.mutation<void, Pet>({
      query: data => ({
        url: "/pet",
        method: "post",
        body: data,
      }),
    }),
  }),
});

export const { useAddPetMutation } = petApi;

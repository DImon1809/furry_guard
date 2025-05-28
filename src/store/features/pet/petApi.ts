import type { Pet } from "@/models/Pet";
import type { PetDetails } from "@/models/Pet";
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

    getOnePet: builder.query<PetDetails, { id: number }>({
      query: ({ id }) => ({
        url: `/pet/${id}`,
        method: "get",
      }),
    }),

    searchBreed: builder.query<string[], string>({
      query: pattern => ({
        url: "/pet/searchBreed",
        method: "get",
        params: {
          pattern,
        },
      }),
    }),
  }),
});

export const { useAddPetMutation, useLazyGetOnePetQuery, useSearchBreedQuery } = petApi;

import type { Pet, PetCard, SendPet, VaccinationType } from "@/models/Pet";
import { WalkingStatusDto } from "@/models/Pet";
import { serviceApi } from "@/store/serviceApi";

export const petApi = serviceApi.injectEndpoints({
  endpoints: builder => ({
    addPet: builder.mutation<void, SendPet>({
      query: data => ({
        url: "/pet",
        method: "post",
        body: data,
      }),
    }),

    getOnePet: builder.query<Pet, { id: number }>({
      query: ({ id }) => ({
        url: `/pet/${id}`,
        method: "get",
      }),
    }),

    toggleWalkStatus: builder.mutation<
      void,
      { petId: number; petWalkingStatus: keyof typeof WalkingStatusDto }
    >({
      query: body => ({
        url: "/pet/walkingStatus",
        method: "post",
        body,
      }),
    }),

    getAllWhoWalk: builder.mutation<PetCard[], void>({
      query: () => ({
        url: "/pet/allWithStatus",
        method: "post",
        body: {
          petWalkingStatus: WalkingStatusDto.WANT_TO_WALK,
        },
      }),
    }),

    loadFile: builder.mutation<void, VaccinationType>({
      query: body => ({
        url: "/file",
        method: "post",
        body,
      }),
    }),

    getAllVaccinations: builder.query<VaccinationType[], number>({
      query: petId => ({
        url: `/file/${petId}`,
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

    searchMetro: builder.query<string[], string>({
      query: pattern => ({
        url: "/metro/searchMetro",
        method: "get",
        params: {
          pattern,
        },
      }),
    }),
  }),
});

export const {
  useAddPetMutation,
  useLazyGetOnePetQuery,
  useToggleWalkStatusMutation,
  useGetAllWhoWalkMutation,
  useLoadFileMutation,
  useGetAllVaccinationsQuery,
  useSearchBreedQuery,
  useSearchMetroQuery,
} = petApi;

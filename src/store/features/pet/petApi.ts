import type { Pet } from "@/models/Pet";
import { WalkingStatusDto } from "@/models/Pet";
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

    getAllWhoWalk: builder.mutation<
      Array<
        Pet & {
          user: {
            id: number;
            firstName: string;
          };
        }
      >,
      void
    >({
      query: () => ({
        url: "/pet/allWithStatus",
        method: "post",
        body: {
          petWalkingStatus: WalkingStatusDto.WANT_TO_WALK,
        },
      }),
    }),

    loadFile: builder.mutation<
      void,
      { fileName: string; fileType: string; content: string; petId: number }
    >({
      query: body => ({
        url: "/file",
        method: "post",
        body,
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

export const {
  useAddPetMutation,
  useLazyGetOnePetQuery,
  useToggleWalkStatusMutation,
  useGetAllWhoWalkMutation,
  useLoadFileMutation,
  useSearchBreedQuery,
} = petApi;

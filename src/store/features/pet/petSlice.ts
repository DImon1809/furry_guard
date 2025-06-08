import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { Pet } from "@/models/Pet";
import { WalkingStatusDto } from "@/models/Pet";

import { petApi } from "./petApi";

const initialState: Omit<Pet, "id"> & { chosenId: number | null } = {
  chosenId: null,
  name: "",
  breed: "",
  gender: null,
  activityLevel: null,
  age: {
    year: 0,
    month: 0,
    week: 0,
  },
  dateOfBirth: null,
  weight: 0,
  recommendations: "",
  hasRecommendations: false,
  vaccinations: {
    common: null,
    commonHeader: null,
    current: null,
    currentHeader: null,
    next: null,
    nextHeader: null,
    previous: null,
    previousHeader: null,
  },
  petWalkingStatus: WalkingStatusDto.WANT_HOME,
  walks: [],
  files: [],
};

export const petSlice = createSlice({
  name: "pet",
  initialState,
  reducers: {
    choosePet: (state, action: PayloadAction<number>) => {
      state.chosenId = action.payload;
    },

    removeChoosePet: () => initialState,
  },

  extraReducers: builder => {
    builder.addMatcher(
      petApi.endpoints.getOnePet.matchFulfilled,
      (state, action: PayloadAction<Pet>) => {
        return { ...state, ...action.payload };
      },
    );
  },
});

export const { choosePet, removeChoosePet } = petSlice.actions;

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { PetDetails } from "@/models/Pet";

import { petApi } from "./petApi";

const initialState: PetDetails & { chosenId: number | null } = {
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
      (state, action: PayloadAction<PetDetails>) => {
        return { ...state, ...action.payload };
      },
    );
  },
});

export const { choosePet, removeChoosePet } = petSlice.actions;

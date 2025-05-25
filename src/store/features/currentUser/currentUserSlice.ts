import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { CurrentUser } from "@/models/CurrentUser";

import { currentUserApi } from "./currentUserApi";

// Todo поработать над типом id
const initialState: CurrentUser = {
  id: 0,
  firstName: "",
  lastName: "",
  surname: "",
  email: "",
  password: "",
  dateOfBirth: "",
  pets: [],
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder.addMatcher(
      currentUserApi.endpoints.current.matchFulfilled,
      (_, action: PayloadAction<CurrentUser>) => action.payload,
    );
  },
});

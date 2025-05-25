import { combineReducers } from "@reduxjs/toolkit";

import { authSlice } from "./features/auth/authSlice";
import { currentUserSlice } from "./features/currentUser/currentUserSlice";
import { petSlice } from "./features/pet/petSlice";
import { serviceApi } from "./serviceApi";

export const rootReducer = combineReducers({
  serviceApi: serviceApi.reducer,
  pet: petSlice.reducer,
  auth: authSlice.reducer,
  currentUser: currentUserSlice.reducer,
});

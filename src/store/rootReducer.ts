import { combineReducers } from "@reduxjs/toolkit";

import { authSlice } from "./features/auth/authSlice";
import { currentUserSlice } from "./features/currentUser/currentUserSlice";
import { serviceApi } from "./serviceApi";

export const rootReducer = combineReducers({
  serviceApi: serviceApi.reducer,
  auth: authSlice.reducer,
  currentUser: currentUserSlice.reducer,
});

import { combineReducers } from "@reduxjs/toolkit";

import { currentUserSlice } from "./currentUserSlice";

export const rootReducer = combineReducers({
  current: currentUserSlice.reducer,
});

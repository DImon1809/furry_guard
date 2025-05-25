import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";

import { authApi } from "../features/auth/authApi";

export const authMiddleware = createListenerMiddleware();

authMiddleware.startListening({
  matcher: isAnyOf(
    authApi.endpoints.register.matchFulfilled,
    authApi.endpoints.login.matchFulfilled,
  ),
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    if (typeof action.payload === "string") {
      localStorage.setItem("token", action.payload);
    }
  },
});

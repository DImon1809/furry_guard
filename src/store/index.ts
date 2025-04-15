import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
  devTools: { name: "Пушистый защитник" },
});

export type RootType = ReturnType<typeof store.getState>;

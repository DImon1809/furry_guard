import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";

import { currentUserApi } from "./features/currentUser/currentUserApi";
import { petApi } from "./features/pet/petApi";
import { authMiddleware } from "./middlewares/authMiddleware";
import { rootReducer } from "./rootReducer";
import { serviceApi } from "./serviceApi";

const apiMiddleware = [
  serviceApi.middleware,
  authMiddleware.middleware,
  currentUserApi.middleware,
  petApi.middleware,
];

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiMiddleware),
  devTools: { name: "Пушистый защитник" },
});

// Todo разобрать
export type RootType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootType> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AboutProject } from "./pages/AboutProject";
import { AnimalsPage } from "./pages/AnimalsPage";
import { AuthPage } from "./pages/AuthPage";
import { HospitalsPage } from "./pages/HospitalsPage";
import { NotFound } from "./pages/NotFound";
import { ProfilePage } from "./pages/ProfilePage";
import { setAuth } from "./store/features/auth/authSlice";
import { useLazyCurrentQuery } from "./store/features/currentUser/currentUserApi";
import { AUTH_TYPES } from "./models";
import { useAppSelector } from "./store";
import { useAppDispatch } from "./store";

export const Root = () => {
  const [getCurrent] = useLazyCurrentQuery();

  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(state => state.auth);

  // todo переделать
  React.useEffect(() => {
    const currentToken = localStorage.getItem("token");

    if (currentToken) {
      getCurrent();

      dispatch(setAuth({ isAuthenticated: true, token: currentToken }));
    }
  }, [dispatch, getCurrent, isAuthenticated]);

  return (
    <BrowserRouter>
      {isAuthenticated ? (
        <Routes>
          <Route path="/" element={<AnimalsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/hospitals" element={<HospitalsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<AboutProject />} />
          <Route path="/register" element={<AuthPage type={AUTH_TYPES.REGISTER} />} />
          <Route path="/login" element={<AuthPage type={AUTH_TYPES.LOGIN} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

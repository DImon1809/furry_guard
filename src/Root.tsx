import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AboutProject } from "./pages/AboutProject";
import { AnimalsPage } from "./pages/AnimalsPage";
import { AuthPage } from "./pages/AuthPage";
import { HospitalsPage } from "./pages/HospitalsPage";
import { NotFound } from "./pages/NotFound";
import { ProfilePage } from "./pages/ProfilePage";
import { addCurrent } from "./store/currentUserSlice";
import { AUTH_TYPES } from "./models";
import { RootType } from "./store";

export const Root = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootType) => state.current);

  React.useEffect(() => {
    const currentToken = localStorage.getItem("token_key");

    if (currentToken) {
      dispatch(addCurrent({ isAuthenticated: true, token: currentToken }));
    }
  }, []);

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

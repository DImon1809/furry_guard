import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AboutProject } from "./pages/AboutProject";
import { AnimalsPage } from "./pages/AnimalsPage";
import { AuthPage } from "./pages/AuthPage";
import { NotFound } from "./pages/NotFound";
import { AUTH_TYPES } from "./models";
import { RootType } from "./store";

export const Root = () => {
  const { isAuthenticated } = useSelector((state: RootType) => state.current);

  console.log(isAuthenticated);

  return (
    <BrowserRouter>
      {isAuthenticated ? (
        <Routes>
          <Route path="/" element={<AnimalsPage />} />
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

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AboutProject } from "./pages/AboutProject";
import { AuthPage } from "./pages/AuthPage";
import { NotFound } from "./pages/NotFound";
import { AUTH_TYPES } from "./models";

export const Root = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AboutProject />} />
        <Route path="/register" element={<AuthPage type={AUTH_TYPES.REGISTER} />} />
        <Route path="/login" element={<AuthPage type={AUTH_TYPES.LOGIN} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

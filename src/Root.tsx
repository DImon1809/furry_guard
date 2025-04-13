import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AboutProject } from "./pages/AboutProject";
import { NotFound } from "./pages/NotFound";

export const Root = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AboutProject />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

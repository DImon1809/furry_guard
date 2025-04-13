import React from "react";

import { Loader } from "@/components/Loader";

const AboutProjectComponent = React.lazy(() => import("./AboutProject"));

export const AboutProject = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <AboutProjectComponent />
    </React.Suspense>
  );
};

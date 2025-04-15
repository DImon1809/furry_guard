import React from "react";

import { Loader } from "@/components/Loader";

const AnimalsPageComponent = React.lazy(() => import("./AnimalsPage"));

export const AnimalsPage = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <AnimalsPageComponent />
    </React.Suspense>
  );
};

import React from "react";

import { Loader } from "@/components/Loader";

const WantToWalkComponent = React.lazy(() => import("./WantToWalkPage"));

export const WantToWalkPage = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <WantToWalkComponent />
    </React.Suspense>
  );
};

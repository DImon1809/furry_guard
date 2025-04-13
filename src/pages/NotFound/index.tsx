import React from "react";

import { Loader } from "@/components/Loader";

const NotFoundComponent = React.lazy(() => import("./NotFound"));

export const NotFound = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <NotFoundComponent />
    </React.Suspense>
  );
};

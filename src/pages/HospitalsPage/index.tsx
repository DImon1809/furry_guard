import React from "react";

import { Loader } from "@/components/Loader";

const HospitalsPageComponent = React.lazy(() => import("./HospitalsPage"));

export const HospitalsPage = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <HospitalsPageComponent />
    </React.Suspense>
  );
};

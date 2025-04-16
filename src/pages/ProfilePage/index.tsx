import React from "react";

import { Loader } from "@/components/Loader";

const ProfilePageComponent = React.lazy(() => import("./ProfilePage"));

export const ProfilePage = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <ProfilePageComponent />
    </React.Suspense>
  );
};

import React from "react";

import { ArrowBack } from "@/components/ui";
import { useAppDispatch } from "@/store";
import { removeChoosePet } from "@/store/features/pet/petSlice";

// import { ActivityInfo } from "./components/ActivityInfo";
import { FilesPage } from "./components/FilesPage";
import { PetInfo } from "./components/PetInfo";
import { ToggleInfo } from "./components/ToggleInfo/ToggleInfo";
import { Vaccinations } from "./components/Vaccinations";

import styles from "./style.module.scss";

export enum PageMap {
  "INFO" = "INFO",
  "FILES" = "FILES",
  "VACCINATIONS" = "VACCINATIONS",
  "ACTIVITY" = "ACTIVITY",
}

export type Pages = keyof typeof PageMap;

export const PetDetails = () => {
  const dispacth = useAppDispatch();

  const [direction, setDirection] = React.useState<Pages>("INFO");

  const closePetDetails = () => {
    dispacth(removeChoosePet());
  };

  const getCurrentPage = () => {
    switch (direction) {
      case PageMap.INFO:
        return <PetInfo />;
      // case PageMap.ACTIVITY:
      //   return <ActivityInfo />;
      case PageMap.FILES:
        return <FilesPage />;
      case PageMap.VACCINATIONS:
        return <Vaccinations />;
      default:
        return <PetInfo />;
    }
  };

  return (
    <section className={styles.pet__details}>
      <nav className={styles.pet__navigate}>
        <ArrowBack handler={closePetDetails} />
        <ToggleInfo direction={direction} setDirection={setDirection} />
      </nav>
      {getCurrentPage()}
    </section>
  );
};

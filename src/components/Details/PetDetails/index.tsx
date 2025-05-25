import React from "react";

import { ArrowBack } from "@/components/ui";
import { useAppDispatch } from "@/store";
import { removeChoosePet } from "@/store/features/pet/petSlice";

import { ActivityInfo } from "./components/ActivityInfo";
import { PetInfo } from "./components/PetInfo";
import { ToggleInfo } from "./components/ToggleInfo/ToggleInfo";

import styles from "./styles.module.scss";

export enum Directions {
  "LEFT" = "LEFT",
  "RIGHT" = "RIGHT",
}

export type Direction = keyof typeof Directions;

export const PetDetails = () => {
  const dispacth = useAppDispatch();

  const [direction, setDirection] = React.useState<Direction>("LEFT");

  const closePetDetails = () => {
    dispacth(removeChoosePet());
  };

  return (
    <section className={styles.pet__details}>
      <nav className={styles.pet__navigate}>
        <ArrowBack handler={closePetDetails} />
        <ToggleInfo direction={direction} setDirection={setDirection} />
      </nav>
      {direction === Directions.LEFT ? <PetInfo /> : <ActivityInfo />}
    </section>
  );
};

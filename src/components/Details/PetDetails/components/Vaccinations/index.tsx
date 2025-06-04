import React from "react";

import { useAppSelector } from "@/store";

import styles from "./style.module.scss";

export const Vaccinations = () => {
  const chosenPet = useAppSelector(state => state.pet);

  return (
    <section className={styles.vaccinations}>
      <div>
        <h4>Здесь будут отображаться прививки вашего питомца</h4>
      </div>
      <div>{chosenPet?.vaccinations ? chosenPet.vaccinations : "Здесь пока ничего нет"}</div>
    </section>
  );
};

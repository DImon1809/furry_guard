import React from "react";

import { useAppSelector } from "@/store";

import styles from "./style.module.scss";

export const Vaccinations = () => {
  const chosenPet = useAppSelector(state => state.pet);

  return (
    <section className={styles.vaccinations}>
      <div className={styles.vaccinations__title}>
        <h4>Здесь будут отображаться прививки вашего питомца</h4>
      </div>
      {chosenPet.vaccinations?.commonHeader ? (
        <div className={styles.vaccination__container}>
          <h4>{chosenPet.vaccinations?.commonHeader}</h4>
          <ul>{chosenPet.vaccinations.common?.split("\n").map(v => <li>{v}</li>)}</ul>
        </div>
      ) : (
        ""
      )}
      {chosenPet.vaccinations?.previousHeader ? (
        <div className={styles.vaccination__container}>
          <h4>{chosenPet.vaccinations?.previousHeader}</h4>
          <ul>{chosenPet.vaccinations?.previous?.split("\n").map(v => <li>{v}</li>)}</ul>
        </div>
      ) : (
        ""
      )}
      {chosenPet.vaccinations?.currentHeader ? (
        <div className={styles.vaccination__container}>
          <h4>{chosenPet.vaccinations?.currentHeader}</h4>
          <ul>{chosenPet.vaccinations?.current?.split("\n").map(v => <li>{v}</li>)}</ul>
        </div>
      ) : (
        ""
      )}
      {chosenPet.vaccinations?.nextHeader ? (
        <div className={styles.vaccination__container}>
          <h4>{chosenPet.vaccinations?.nextHeader}</h4>
          <ul>{chosenPet.vaccinations?.next?.split("\n").map(v => <li>{v}</li>)}</ul>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

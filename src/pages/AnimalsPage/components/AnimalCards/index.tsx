import React from "react";

import { AnimalCard } from "./AnimalCard";

import styles from "./style.module.scss";

const animals = Array(9).fill([]);

export const AnimalCards = () => {
  return (
    <div className={styles.animals__list}>
      {animals.map((_, index) => (
        <AnimalCard nodeTime={index * 200} key={index} />
      ))}
    </div>
  );
};

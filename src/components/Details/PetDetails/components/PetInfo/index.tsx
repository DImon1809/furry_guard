import React from "react";
import { FaPaw } from "react-icons/fa6";

import { matcherActivity } from "@/lib/matchers/matcherActivity";
import { matcherGender } from "@/lib/matchers/matcherGender";
import { cn } from "@/lib/utils";
import { ActivityLevel } from "@/models/Pet";
import { useAppSelector } from "@/store";

import styles from "./styles.module.scss";

export const PetInfo = () => {
  const chosenPet = useAppSelector(state => state.pet);

  return (
    <>
      <section className={styles.pet__info}>
        <div className={styles.pet__avatar}>
          <img
            src="https://www.proplan.ru/sites/default/files/styles/image_576/public/2023-08/15.jpg?itok=wkCYRRkp"
            alt="#"
          />
        </div>
        <div className={styles.pet__confidant}>
          <div className={styles.pet__name__status}>
            <h4>{chosenPet.name}</h4>
            <p className={styles.status}>{`${chosenPet.gender === "М" ? "здоров" : "здорова"}`}</p>
          </div>
          <div className={styles.breed}>
            {`${chosenPet.breed}`} <FaPaw />
          </div>
          <div
            className={cn(styles.gender, chosenPet.gender === "М" ? styles.man : styles.woman)}
          >{`Пол: ${matcherGender(chosenPet.gender)}`}</div>
          <div>{`${chosenPet.dateOfBirth || "Дата рождения не указана"}`}</div>
          <div>{`Порода: ${chosenPet.breed}`}</div>
          <div>{`Текущий вес: ${chosenPet.weight} кг.`}</div>
          <div
            className={cn(
              styles.activity,
              chosenPet.activityLevel === ActivityLevel.HIGH
                ? styles.high
                : chosenPet.activityLevel === ActivityLevel.MEDIUM
                  ? styles.medium
                  : chosenPet.activityLevel === ActivityLevel.LOW
                    ? styles.low
                    : "",
            )}
          >{`Активность: ${matcherActivity(chosenPet.activityLevel)}`}</div>
        </div>
      </section>
      <footer className={styles.recommendations}>
        <div>
          <h4>Рекомендации для вашего питомца</h4>
        </div>
        <div>{`${chosenPet.recommendations}`}</div>
      </footer>
    </>
  );
};

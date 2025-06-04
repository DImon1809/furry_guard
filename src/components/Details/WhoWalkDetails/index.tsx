import React from "react";
import { FaPaw } from "react-icons/fa6";

import { format } from "date-fns";
import { ru } from "date-fns/locale";

import { ArrowBack } from "@/components/ui";
import { matcherActivity, matcherGender } from "@/lib/matchers";
import { cn } from "@/lib/utils";
import { ActivityLevel } from "@/models/Pet";
import { useAppDispatch, useAppSelector } from "@/store";
import { removeChoosePet } from "@/store/features/pet/petSlice";

import styles from "./style.module.scss";

export const WhoWalkDetails = () => {
  const dispacth = useAppDispatch();

  const chosenPet = useAppSelector(state => state.pet);

  const petDate = chosenPet.dateOfBirth
    ? `Дата рождения: ${format(chosenPet.dateOfBirth, "dd.MM.yyyy", { locale: ru })}`
    : chosenPet.age.year && chosenPet.age.month
      ? `Возраст: ${chosenPet.age.year > 4 ? chosenPet.age.year + " лет" : chosenPet.age.year + " года"} ${chosenPet.age.month > 4 ? chosenPet.age.month + " месяцев" : chosenPet.age.month + " месяца"} `
      : "Дата рождения и примерный возраст не указаны";

  const closeWhoWalkDetails = () => {
    dispacth(removeChoosePet());
  };

  return (
    <section className={styles.whoWalk__details}>
      <ArrowBack handler={closeWhoWalkDetails} />
      <section className={styles.whoWalk__info}>
        <div className={styles.whoWalk__avatar}>
          <img
            src="	https://kuban24.tv/wp-content/uploads/2023/06/photo_2023-06-22_11-36-58.jpg"
            alt="#"
          />
        </div>
        <div className={styles.whoWalk__confidant}>
          <div className={styles.whoWalk__name__status}>
            <h4>{chosenPet.name}</h4>
          </div>

          <div
            className={cn(styles.gender, chosenPet.gender === "М" ? styles.man : styles.woman)}
          >{`Пол: ${matcherGender(chosenPet.gender)}`}</div>

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

          <div className={styles.breed}>
            {`Порода: ${chosenPet.breed}`} <FaPaw />
          </div>

          <div>{petDate}</div>
        </div>
      </section>
    </section>
  );
};

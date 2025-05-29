import React from "react";
import { FaPaw } from "react-icons/fa";

import { matcherGender } from "@/lib/matchers";
import { cn } from "@/lib/utils";
import type { Pet } from "@/models/Pet";

import styles from "./style.module.scss";

type Props = {
  pet: Pet & {
    user: {
      id: number;
      firstName: string;
    };
  };
  nodeTime: number;
};

export const WhoWalkCard = ({ pet, nodeTime }: Props) => {
  const [isAnimation, setIsAnimation] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!isAnimation) {
      setTimeout(() => {
        setIsAnimation(true);
      }, nodeTime);
    }
  }, [isAnimation, nodeTime]);

  return (
    <div className={cn(styles.who__walk__card, isAnimation && styles.move)}>
      <div className={styles.top}>
        <div className={styles.who__walk__avatar}>
          <img
            src="	https://kuban24.tv/wp-content/uploads/2023/06/photo_2023-06-22_11-36-58.jpg"
            alt="#"
          />
        </div>

        <div className={styles.who__walk__description}>
          <div className={styles.nickname}>
            <h3>{pet.name}</h3>
          </div>

          <div className={styles.breed}>
            {`Порода: ${pet.breed || "не указана"}`} <FaPaw />
          </div>

          <div
            className={cn(styles.gender, pet.gender === "М" ? styles.man : styles.woman)}
          >{`Пол: ${matcherGender(pet.gender)}`}</div>
        </div>
      </div>
      <div className={styles.owner__info}>
        <div className={styles.owner__avatar}></div>
        <div className={styles.owner__nickname}>
          {pet?.user ? pet.user.firstName : "Никнейм не указан"}
        </div>
      </div>
    </div>
  );
};

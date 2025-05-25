import React from "react";

import { format } from "date-fns";
import { ru } from "date-fns/locale";

import { Cross } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { PetOfUser } from "@/models/CurrentUser";

import styles from "./style.module.scss";

type Props = {
  pet: PetOfUser;
  nodeTime: number;
};

export const AnimalCard = ({ pet, nodeTime }: Props) => {
  const [isAnimation, setIsAnimation] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!isAnimation) {
      setTimeout(() => {
        setIsAnimation(true);
      }, nodeTime);
    }
  }, [isAnimation, nodeTime]);

  return (
    <div className={cn(styles.animal__card, isAnimation && styles.move)}>
      <div className={styles.animal__avatar}>
        <img
          src="https://www.proplan.ru/sites/default/files/styles/image_576/public/2023-08/15.jpg?itok=wkCYRRkp"
          alt="#"
        />
      </div>

      <div className={styles.animal__description}>
        <div className={styles.nickname__status}>
          <h3>{pet.name}</h3>
          <p className={styles.status}>здоров</p>
        </div>
        <div>{`Дата рождения: ${format(new Date(), "dd.MM.yyyy", { locale: ru })}`}</div>
        <div>Сидит дома</div>
      </div>

      <div className={styles.cross__wrapper}>
        <Cross />
      </div>
    </div>
  );
};

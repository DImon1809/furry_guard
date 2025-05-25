import React, { SetStateAction } from "react";

import { cn } from "@/lib/utils";

import type { Direction } from "../..";
import { Directions } from "../..";

import styles from "./styles.module.scss";

type Props = {
  direction: Direction;
  setDirection: React.Dispatch<SetStateAction<Direction>>;
};

export const ToggleInfo = ({ direction, setDirection }: Props) => {
  const handleToggle = (direction: Direction) => {
    setDirection(direction);
  };

  return (
    <ul className={styles.items}>
      <div
        className={cn(
          styles.toggle__border,
          direction === Directions.LEFT ? styles.left : styles.right,
        )}
      ></div>
      <li className={styles.item} onClick={() => handleToggle(Directions.LEFT)}>
        Профиль
      </li>
      <li className={styles.item} onClick={() => handleToggle(Directions.RIGHT)}>
        Активности
      </li>
    </ul>
  );
};

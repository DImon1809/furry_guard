import React, { SetStateAction } from "react";

import { cn } from "@/lib/utils";

import type { Pages } from "../..";
import { PageMap } from "../..";

import styles from "./style.module.scss";

type Props = {
  direction: Pages;
  setDirection: React.Dispatch<SetStateAction<Pages>>;
};

export const ToggleInfo = ({ direction, setDirection }: Props) => {
  const handleToggle = (direction: Pages) => {
    setDirection(direction);
  };

  return (
    <ul className={styles.items}>
      <div
        className={cn(
          styles.toggle__border,
          direction === PageMap.INFO
            ? styles.info
            : direction === PageMap.FILES
              ? styles.files
              : direction === PageMap.VACCINATIONS
                ? styles.vaccinations
                : styles.activity,
        )}
      ></div>
      <li className={styles.item} onClick={() => handleToggle(PageMap.INFO)}>
        Профиль
      </li>
      <li className={styles.item} onClick={() => handleToggle(PageMap.FILES)}>
        Файлы
      </li>
      <li className={styles.item} onClick={() => handleToggle(PageMap.VACCINATIONS)}>
        Прививки
      </li>
      {/* <li className={styles.item} onClick={() => handleToggle(PageMap.ACTIVITY)}>
        Активности
      </li> */}
    </ul>
  );
};

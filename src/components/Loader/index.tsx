import paw from "@/assets/paw.webp";
import { cn } from "@/lib/utils";

import styles from "./style.module.scss";

export const Loader = () => {
  return (
    <div className={styles.wrapper}>
      <div className={cn(styles.wrapper__paw, styles.step__1)}>
        <img src={paw} alt="#" />
      </div>
      <div className={cn(styles.wrapper__paw, styles.step__2)}>
        <img src={paw} alt="#" />
      </div>
      <div className={cn(styles.wrapper__paw, styles.step__3)}>
        <img src={paw} alt="#" />
      </div>
    </div>
  );
};

import { Label } from "@/components/ui";

import styles from "./style.module.scss";

export const AvatarChange = () => {
  return (
    <div className={styles.change__wrapper}>
      <div className={styles.avatar__change} id="avatar__change">
        <div className={styles.plus}>
          <span className={styles.horisontal}></span>
          <span className={styles.vertical}></span>
        </div>
      </div>

      <Label htmlFor="avatar__change">Загрузите новую аватарку</Label>
    </div>
  );
};

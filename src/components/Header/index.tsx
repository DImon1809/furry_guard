import logo from "@/assets/dog.webp";

import { Button } from "../ui";

import styles from "./style.module.scss";

export const Header = () => {
  return (
    <nav className={styles.header}>
      <div className={styles.wrapper__logo}>
        <img src={logo} alt="#" />
      </div>
      <div className={styles.wrapper__items}>
        <div className={styles.sign__in}>
          <span>Войти</span>
        </div>
        <Button className="w-32" variant="outline">
          Регистрация
        </Button>
      </div>
    </nav>
  );
};

import { useNavigate } from "react-router-dom";

import logo from "@/assets/dog.webp";

import { Button } from "../ui";

import styles from "./style.module.scss";

export const Header = () => {
  const navigate = useNavigate();

  const goToMain = (): void => {
    navigate("/");
  };

  const goToLogin = (): void => {
    navigate("/login");
  };

  const goToRegister = (): void => {
    navigate("/register");
  };

  return (
    <nav className={styles.header}>
      <div className={styles.wrapper__logo} onClick={goToMain}>
        <img src={logo} alt="#" />
      </div>
      <div className={styles.wrapper__items}>
        <div className={styles.sign__in} onClick={goToLogin}>
          <span>Войти</span>
        </div>
        <Button className="w-32" variant="outline" onClick={goToRegister}>
          Регистрация
        </Button>
      </div>
    </nav>
  );
};

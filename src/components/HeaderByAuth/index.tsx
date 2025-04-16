import React from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";

import { Button } from "../ui";

import styles from "./style.module.scss";

export const HeaderByAuth = () => {
  const navigate = useNavigate();

  const { logOut } = useAuth();

  const goToProfile = () => {
    navigate("/profile");
  };

  const goToHospitals = () => {
    navigate("/hospitals");
  };

  const gotToAnimals = () => {
    navigate("/");
  };

  const handleLogOut = () => {
    logOut();
  };

  return (
    <nav className={styles.header}>
      <div className={styles.profile__wrapper}>
        <div className={styles.profile__avatar} onClick={goToProfile}></div>
        <div>
          <span>Ваше имя</span>
        </div>
      </div>
      <div className={styles.buttons}>
        <Button className="w-36" variant="outline" onClick={goToHospitals}>
          Выбрать клинику
        </Button>
        <Button className="w-32" variant="outline" onClick={gotToAnimals}>
          Мои животные
        </Button>
        <Button className="w-20" variant="outline" onClick={handleLogOut}>
          Выход
        </Button>
      </div>
    </nav>
  );
};

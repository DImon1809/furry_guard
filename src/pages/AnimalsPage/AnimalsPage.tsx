import React from "react";

import { HeaderByAuth } from "@/components/HeaderByAuth";
import { Input } from "@/components/ui";

import { AnimalCards } from "./components/AnimalCards";
import { AnimalFilter } from "./components/AnimalFilter";

import styles from "./style.module.scss";

const AnimalsPage = () => {
  return (
    <>
      <HeaderByAuth />
      <main className={styles.section}>
        <AnimalFilter />
        <section className={styles.animals__list}>
          <div className={styles.animals__input__wrapper}>
            <Input type="text" id="surname" placeholder="Поиск..." className="!px-2" />
          </div>
          <AnimalCards />
        </section>
      </main>
    </>
  );
};

export default AnimalsPage;

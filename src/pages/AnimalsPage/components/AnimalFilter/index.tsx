import React from "react";

import { Button, Label, Selector } from "@/components/ui";

import styles from "./style.module.scss";

export const AnimalFilter = () => {
  return (
    <section className={styles.left__filter}>
      <div>
        <Label htmlFor="species">Вид животного</Label>
        <Selector
          id="species"
          placeholder="Выберите вид животного..."
          list={["Кот", "Собака", "Жираф", "Тигр"]}
        />
      </div>

      <div>
        <Label htmlFor="gender">Пол</Label>
        <Selector
          id="gender"
          placeholder="Выберите пол животного..."
          list={["Мальчик", "Девочка"]}
        />
      </div>

      <div>
        <Label htmlFor="location">Место нахождения</Label>
        <Selector id="location" placeholder="Выберите местохождение..." list={["Дома", "Гуляет"]} />
      </div>

      <div>
        <Label htmlFor="status">Статус</Label>
        <Selector id="status" placeholder="Выберите статус..." list={["Здоров", "Болен"]} />
      </div>

      <div>
        <Label htmlFor="sort">Сортировать</Label>
        <Selector
          id="sort"
          placeholder="Выберите статус..."
          list={["По алфавиту", "По возрастания", "По убыванию", "С конца"]}
        />
      </div>

      <Button className="w-64 !mx-auto">Показать результат</Button>
    </section>
  );
};

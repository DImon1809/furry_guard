import React from "react";

import { ContentWrapper } from "@/components/ContentWrapper";

import { TransferPoints } from "./components/TransferPoints";

import styles from "./style.module.scss";

const AboutProject = () => {
  return (
    <ContentWrapper>
      <section className={styles.section}>
        <h1 className={styles.main__header}>
          Furry guard – умный мониторинг здоровья вашего питомца
        </h1>

        <div className={styles.intro}>
          <p>
            С каждым годом всё больше людей считают домашних животных членами семьи. Но как вовремя
            заметить изменения в их здоровье? Многие болезни долго остаются незаметными, а
            регулярные визиты к ветеринару требуют времени и денег.
          </p>
        </div>

        <h3 className={styles.transfer__header}>
          Furry guard – это удобное приложение для контроля здоровья вашего любимца:
        </h3>

        <TransferPoints />

        <h3 className={styles.question__header}>Почему это актуально?</h3>
        <ul className={styles.answers}>
          <li>
            ✔ Домашних животных становится больше – растёт спрос на удобные решения для ухода.
          </li>
          <li>
            ✔ Современные технологии (Bluetooth-ошейники, датчики) делают мониторинг доступным.
          </li>
          <li>
            ✔ Аналогов для домашних питомцев почти нет – большинство решений рассчитаны на
            фермерские хозяйства.
          </li>
        </ul>
      </section>
    </ContentWrapper>
  );
};

export default AboutProject;

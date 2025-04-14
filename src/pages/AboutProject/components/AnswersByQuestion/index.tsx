import { Answer } from "./Answer";

import styles from "./style.module.scss";

const answers = [
  "✔ Домашних животных становится больше – растёт спрос на удобные решения для ухода.",
  "✔ Современные технологии (Bluetooth-ошейники, датчики) делают мониторинг доступным.",
  "✔ Аналогов для домашних питомцев почти нет – большинство решений рассчитаны на фермерские хозяйства.",
];

export const AnswersByQuestion = () => {
  return (
    <div className={styles.answers__question}>
      {answers.map((answer, index) => {
        return <Answer answer={answer} nodeTime={index * 200} key={index} />;
      })}
    </div>
  );
};

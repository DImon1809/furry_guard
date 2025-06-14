import { Point } from "./Point";

import styles from "./style.module.scss";

const points = [
  "Отслеживание активности – анализируйте уровень подвижности с помощью умных ошейников и датчиков.",
  "Контроль питания – ведите дневник кормления и получайте рекомендации.",
  "Раннее предупреждение о возможных проблемах на основе данных.",
  // "Интеграция с IoT-устройствами для круглосуточного мониторинга.",
];

export const TransferPoints = () => {
  return (
    <div className={styles.transfer__points}>
      {points.map((point, index) => {
        return <Point pointText={point} nodeTime={index * 200} key={index} />;
      })}
    </div>
  );
};

import { HospitalCard } from "./HospitalCard";

import styles from "./style.module.scss";

const hospital = Array(9).fill([]);

export const HospitalCards = () => {
  return (
    <div className={styles.hospitals__list}>
      {hospital.map((_, i) => (
        <HospitalCard nodeTime={i * 200} key={i} />
      ))}
    </div>
  );
};

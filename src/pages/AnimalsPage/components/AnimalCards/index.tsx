import { useAppSelector } from "@/store";

import { AnimalCard } from "./AnimalCard";

import styles from "./style.module.scss";

// const animals = Array(9).fill([]);

export const AnimalCards = () => {
  const { pets } = useAppSelector(state => state.currentUser);

  return (
    <div className={styles.animals__list}>
      {pets.length ? (
        pets.map((pet, i) => <AnimalCard key={i} pet={pet} nodeTime={i * 200} />)
      ) : (
        <div>
          <h4>Вы не добавляли питомцев</h4>
        </div>
      )}
    </div>
  );
};

import React from "react";

import type { PetCard } from "@/models/Pet";

import { WhoWalkCard } from "./WhoWalkCard";

import styles from "./style.module.scss";

type Props = {
  walkPets: PetCard[];
  isSuccess: boolean;
};

export const WhoWalkCards = ({ walkPets, isSuccess }: Props) => {
  // Todo переделать логику
  return (
    <div className={styles.who__walk__list}>
      {isSuccess && walkPets?.length ? (
        walkPets.map((pet, i) => <WhoWalkCard key={i} pet={pet} nodeTime={i * 200} />)
      ) : (
        <div>
          <h4>Пока никто не хочет гулять</h4>
        </div>
      )}
    </div>
  );
};

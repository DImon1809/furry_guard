import React from "react";

import { PetDetails } from "@/components/Details/PetDetails";
import { HeaderByAuth } from "@/components/HeaderByAuth";
import { Input } from "@/components/ui";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store";

import { AnimalCards } from "./components/AnimalCards";
import { AnimalFilter } from "./components/AnimalFilter";

import styles from "./style.module.scss";

const AnimalsPage = () => {
  const { chosenId } = useAppSelector(state => state.pet);

  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isMove, setIsMove] = React.useState<boolean>(false);

  const handleOpenFilter = () => {
    setIsOpen(state => !state);
  };

  const handleCloseFilter = () => {
    setIsMove(false);

    setTimeout(() => {
      setIsOpen(false);
    }, 600);
  };

  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsMove(true);
      }, 600);

      return;
    }

    setIsMove(false);
  }, [isOpen]);

  if (chosenId) return <PetDetails />;

  return (
    <>
      <HeaderByAuth />
      <section className={styles.section}>
        <div className={cn(styles.additional__filter, isOpen && styles.open)}>
          <div className={styles.open__filter}>
            <Button className="w-48" onClick={handleOpenFilter}>
              Параметры поиска
            </Button>
          </div>
          <div className={cn(styles.filter__wrapper, isMove && styles.move)}>
            <AnimalFilter isOpen={isOpen} handleOpenFilter={handleCloseFilter} />
          </div>
        </div>

        <section className={styles.animals__section}>
          <Input type="text" id="surname" placeholder="Поиск..." className="!px-2" />

          <AnimalCards />
        </section>
      </section>
    </>
  );
};

export default AnimalsPage;

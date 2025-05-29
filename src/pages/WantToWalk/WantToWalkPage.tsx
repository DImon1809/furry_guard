import React from "react";

import { HeaderByAuth } from "@/components/HeaderByAuth";
import { Button, Input } from "@/components/ui";
import { cn } from "@/lib/utils";

import { WhoWalkCards } from "./components/WhoWalkCards";
import { WhoWalkFilter } from "./components/WhoWalkFilter";

import styles from "./style.module.scss";

const WantToWalkPage = () => {
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

  // Todo выполнить рефакторинг
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
            <WhoWalkFilter isOpen={isOpen} handleOpenFilter={handleCloseFilter} />
          </div>
        </div>

        <section className={styles.animals__section}>
          <Input type="text" placeholder="Поиск..." className="!px-2" />

          <WhoWalkCards />
        </section>
      </section>
    </>
  );
};

export default WantToWalkPage;

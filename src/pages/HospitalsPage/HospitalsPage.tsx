import React from "react";

import { HeaderByAuth } from "@/components/HeaderByAuth";
import { Button, Input } from "@/components/ui";
import { cn } from "@/lib/utils";

import { HospitalCards } from "./components/HospitalCards";
import { HospitalFilter } from "./components/HospitalFilter";

import styles from "./styles.module.scss";

const HospitalsPage = () => {
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

  return (
    <>
      <HeaderByAuth />
      <main className={styles.section}>
        <div className={cn(styles.additional__filter, isOpen && styles.open)}>
          <div className={styles.open__filter}>
            <Button className="w-48" onClick={handleOpenFilter}>
              Параметры поиска
            </Button>
          </div>
          <div className={cn(styles.filter__wrapper, isMove && styles.move)}>
            <HospitalFilter isOpen={isOpen} handleOpenFilter={handleCloseFilter} />
          </div>
        </div>

        <section className={styles.hospitals__section}>
          <Input type="text" id="surname" placeholder="Поиск..." className="!px-2" />
          <HospitalCards />
        </section>
      </main>
    </>
  );
};

export default HospitalsPage;

import React from "react";
import { toast } from "react-toastify";

import { WhoWalkDetails } from "@/components/Details/WhoWalkDetails";
import { HeaderByAuth } from "@/components/HeaderByAuth";
import { Button, Input } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { PetCard } from "@/models/Pet";
import { useAppSelector } from "@/store";
import { useGetAllWhoWalkMutation } from "@/store/features/pet/petApi";

import { WhoWalkCards } from "./components/WhoWalkCards";
import { WhoWalkFilter } from "./components/WhoWalkFilter";

import styles from "./style.module.scss";

const WantToWalkPage = () => {
  const { chosenId } = useAppSelector(state => state.pet);
  const { id } = useAppSelector(state => state.currentUser);

  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isMove, setIsMove] = React.useState<boolean>(false);
  const [walkPets, setWalkPets] = React.useState<PetCard[]>([]);

  const [getAllWhoWalk, { data: whoWalk, isSuccess }] = useGetAllWhoWalkMutation();

  const defaultWalkPets = React.useMemo(() => {
    return whoWalk?.filter(({ user }) => user.id !== id);
  }, [whoWalk]);

  React.useEffect(() => {
    getAllWhoWalk()
      .unwrap()
      .catch(() => {
        toast.error("Неверный логин или пароль", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  }, []);

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

  React.useEffect(() => {
    if (defaultWalkPets) setWalkPets(defaultWalkPets);
  }, [id, defaultWalkPets]);

  if (chosenId) return <WhoWalkDetails />;

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
            <WhoWalkFilter
              isOpen={isOpen}
              defaultWalkPets={defaultWalkPets || []}
              setWalkPets={setWalkPets}
              handleOpenFilter={handleCloseFilter}
            />
          </div>
        </div>

        <section className={styles.animals__section}>
          <Input type="text" placeholder="Поиск..." className="!px-2" />

          <WhoWalkCards walkPets={walkPets} isSuccess={isSuccess} />
        </section>
      </section>
    </>
  );
};

export default WantToWalkPage;

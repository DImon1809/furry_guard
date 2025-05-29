import React from "react";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import { toast } from "react-toastify";

import { Cross } from "@/components/ui";
import { matcherWalkStatus } from "@/lib/matchers";
import { cn } from "@/lib/utils";
import type { PetOfUser } from "@/models/CurrentUser";
import { WalkingStatusDto } from "@/models/Pet";
import { useAppDispatch } from "@/store";
import { useLazyCurrentQuery } from "@/store/features/currentUser/currentUserApi";
import { useLazyGetOnePetQuery, useToggleWalkStatusMutation } from "@/store/features/pet/petApi";
import { choosePet } from "@/store/features/pet/petSlice";

import styles from "./style.module.scss";

type Props = {
  pet: PetOfUser;
  nodeTime: number;
};

export const AnimalCard = ({ pet, nodeTime }: Props) => {
  const dispatch = useAppDispatch();

  const [toggleStatus] = useToggleWalkStatusMutation();
  const [getUserData] = useLazyCurrentQuery();

  const [getOnePet] = useLazyGetOnePetQuery();

  const [isAnimation, setIsAnimation] = React.useState<boolean>(false);

  const goToDetails = async () => {
    try {
      await getOnePet({ id: pet.id }).unwrap();
      dispatch(choosePet(pet.id));
    } catch {
      toast.error("Что-то пошло не так", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const hanldleToggleWalkStatus = async (event: React.MouseEvent<HTMLDivElement>) => {
    try {
      event.stopPropagation();

      await toggleStatus({
        petId: pet.id,
        petWalkingStatus:
          pet.petWalkingStatus === WalkingStatusDto.WANT_HOME
            ? WalkingStatusDto.WANT_TO_WALK
            : WalkingStatusDto.WANT_HOME,
      }).unwrap();

      await getUserData().unwrap();

      toast.success("Поставьте пять плз", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch {
      toast.error("Что-то пошло не так", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  React.useEffect(() => {
    if (!isAnimation) {
      setTimeout(() => {
        setIsAnimation(true);
      }, nodeTime);
    }
  }, [isAnimation, nodeTime]);

  return (
    <div className={cn(styles.animal__card, isAnimation && styles.move)} onClick={goToDetails}>
      <div className={styles.animal__avatar}>
        <img
          src="https://www.proplan.ru/sites/default/files/styles/image_576/public/2023-08/15.jpg?itok=wkCYRRkp"
          alt="#"
        />
      </div>

      <div className={styles.animal__description}>
        <div className={styles.nickname__status}>
          <h3>{pet.name}</h3>
          <p className={styles.status}>здоров</p>
        </div>

        <div
          className={cn(
            styles.walk__status,
            pet.petWalkingStatus === WalkingStatusDto.WANT_TO_WALK && styles.want__walk,
          )}
          onClick={hanldleToggleWalkStatus}
        >
          {`Текущий статус: ${matcherWalkStatus(pet.petWalkingStatus)}`}
          {pet.petWalkingStatus === WalkingStatusDto.WANT_HOME ? (
            <FaToggleOff size={26} />
          ) : (
            <FaToggleOn size={26} />
          )}
        </div>
      </div>

      <div className={styles.cross__wrapper}>
        <Cross />
      </div>
    </div>
  );
};

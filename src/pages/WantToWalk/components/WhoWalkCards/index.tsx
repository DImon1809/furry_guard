import React from "react";
import { toast } from "react-toastify";

import { useAppSelector } from "@/store";
import { useGetAllWhoWalkMutation } from "@/store/features/pet/petApi";

import { WhoWalkCard } from "./WhoWalkCard";

import styles from "./style.module.scss";

export const WhoWalkCards = () => {
  const { id } = useAppSelector(state => state.currentUser);

  const [getAllWhoWalk, { data: whoWalk, isSuccess }] = useGetAllWhoWalkMutation();

  const walkPets = whoWalk?.filter(({ user }) => user.id !== id);

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

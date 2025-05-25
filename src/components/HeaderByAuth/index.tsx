import { FaRegHospital } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { PiDogDuotone } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/store";
import { useAppSelector } from "@/store";
import { logout } from "@/store/features/auth/authSlice";

import { Button } from "../ui";

import styles from "./style.module.scss";

enum paths {
  animals = "/",
  profile = "/profile",
  hospitals = "/hospitals",
}

export const HeaderByAuth = () => {
  const dispacth = useAppDispatch();

  const { firstName, lastName, surname } = useAppSelector(state => state.currentUser);

  const location = useLocation();
  const navigate = useNavigate();

  const currentLocation = `/${location.pathname.split("/").at(-1)}`;

  const goToProfile = () => {
    navigate(paths.profile);
  };

  const gotToAnimals = () => {
    navigate(paths.animals);
  };

  const goToHospitals = () => {
    navigate(paths.hospitals);
  };

  // todo переделать
  const handleLogOut = () => {
    dispacth(logout());
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className={styles.header}>
      <div className={styles.profile__wrapper}>
        <div className={styles.profile__avatar} onClick={goToProfile}></div>
        <div>
          <span>{`${lastName} ${firstName} ${surname}`}</span>
        </div>
      </div>
      <div className={styles.buttons}>
        <Button className="w-32" variant="outline" onClick={gotToAnimals}>
          Мои животные
        </Button>
        <Button className="w-36" variant="outline" onClick={goToHospitals}>
          Выбрать клинику
        </Button>
        <Button className="w-20" variant="outline" onClick={handleLogOut}>
          Выход
        </Button>
      </div>

      <div className={styles.mobile__menu}>
        <div>
          <PiDogDuotone
            size={26}
            color={currentLocation === paths.animals ? "#008000" : "#f3f4f6"}
            onClick={gotToAnimals}
          />
        </div>
        <div>
          <FaRegHospital
            size={26}
            color={currentLocation === paths.hospitals ? "#008000" : "#f3f4f6"}
            onClick={goToHospitals}
          />
        </div>

        <div>
          <IoMdExit size={26} color="#f3f4f6" onClick={handleLogOut} />
        </div>
      </div>
    </nav>
  );
};

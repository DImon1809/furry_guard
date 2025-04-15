import React from "react";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";

import styles from "./style.module.scss";

export const ArrowBack = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return <GoArrowLeft size={22} className={styles.arrow__back} onClick={goBack} />;
};

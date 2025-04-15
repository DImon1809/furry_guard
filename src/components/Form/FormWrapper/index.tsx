import React from "react";

import styles from "./style.module.scss";

type Props = {
  children: React.ReactNode;
};

export const FormWrapper = ({ children }: Props) => {
  return <form className={styles.form}>{children}</form>;
};

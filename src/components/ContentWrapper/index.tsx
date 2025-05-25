import React from "react";

import styles from "./style.module.scss";

type Props = {
  children: React.ReactNode;
};

export const ContentWrapper = ({ children }: Props) => {
  return <section className={styles.content__wrapper}>{children}</section>;
};

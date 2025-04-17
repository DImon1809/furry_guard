import { GoArrowLeft } from "react-icons/go";

import styles from "./style.module.scss";

type Props = {
  handler: () => void;
};

export const ArrowBack = ({ handler }: Props) => {
  return <GoArrowLeft size={22} className={styles.arrow__back} onClick={handler} />;
};

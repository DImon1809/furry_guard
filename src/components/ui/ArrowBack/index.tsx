import { GoArrowLeft } from "react-icons/go";

import { cn } from "@/lib/utils";

import styles from "./style.module.scss";

type Props = {
  handler: () => void;
  className?: string;
};

export const ArrowBack = ({ handler, className }: Props) => {
  return <GoArrowLeft size={22} onClick={handler} className={cn(className, styles.arrow__back)} />;
};

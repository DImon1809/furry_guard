import React from "react";

import { cn } from "@/lib/utils";

import styles from "./style.module.scss";

type Props = {
  pointText: string;
  nodeTime: number;
};

export const Point = ({ pointText, nodeTime }: Props) => {
  const [isAnimation, setIsAnimation] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!isAnimation) {
      setTimeout(() => {
        setIsAnimation(true);
      }, nodeTime);
    }
  }, [isAnimation, nodeTime]);

  return <div className={cn(styles.point, isAnimation ? styles.move : "")}>{pointText}</div>;
};

import React from "react";

import { cn } from "@/lib/utils";

import styles from "./style.module.scss";

type Props = {
  answer: string;
  nodeTime: number;
};

export const Answer = ({ answer, nodeTime }: Props) => {
  const [isAnimation, setIsAnimation] = React.useState<boolean>(false);

  const answerRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = (): void => {
    const answerBlock = answerRef?.current?.getBoundingClientRect();

    if (answerBlock && answerBlock.top <= window.innerHeight - 50) {
      setIsAnimation(true);
    }

    if (answerBlock && answerBlock.top > window.innerHeight) {
      setIsAnimation(false);
    }
  };

  React.useEffect(() => {
    const checkVisibility = () => {
      setTimeout(handleScroll, nodeTime);
    };

    checkVisibility();

    document.addEventListener("scroll", handleScroll);

    return () => document.removeEventListener("scroll", handleScroll);
  }, [nodeTime]);

  return (
    <div ref={answerRef} className={cn(styles.answer, isAnimation && styles.move)}>
      {answer}
    </div>
  );
};

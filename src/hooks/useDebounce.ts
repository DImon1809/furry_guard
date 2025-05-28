import React from "react";

export const useDebounce = (str: string, delay = 400): string => {
  const [currentStr, setCurrentStr] = React.useState<string>("");

  React.useEffect(() => {
    const timer = setTimeout(() => setCurrentStr(str), delay);

    return () => clearTimeout(timer);
  }, [delay, str]);

  return currentStr;
};

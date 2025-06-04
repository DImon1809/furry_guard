import React from "react";

export const useCheckWidth = () => {
  const [windowWidth, setWindowWidth] = React.useState<number>(window.innerWidth);
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    document.addEventListener("resize", handleResize);

    return () => document.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    if (windowWidth <= 640) {
      return setIsMobile(true);
    }

    setIsMobile(false);
  }, [windowWidth]);

  return [isMobile];
};

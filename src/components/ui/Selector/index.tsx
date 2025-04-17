import React from "react";
import { AiFillCaretRight } from "react-icons/ai";

import { cn } from "@/lib/utils";

import styles from "./style.module.scss";

type Props = {
  list: string[];
  placeholder: string;
  id: string;
};

export const Selector = ({
  list,
  placeholder,
  id,
  ...props
}: React.ComponentProps<"div"> & Props) => {
  const selectRef = React.useRef<HTMLDivElement>(null);

  const [data, setData] = React.useState<string>("");
  const [active, setActive] = React.useState<boolean>(false);

  const [windowWidth, setWindowWidth] = React.useState<number>(window.innerWidth);
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  const handleActiveSelect = () => {
    setActive(state => !state);
  };

  const handleClickList = (event: React.MouseEvent<HTMLLIElement>) => {
    setData(event.currentTarget.textContent || "");
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  return (
    <>
      <select style={{ display: "none" }} id={id}>
        {list.map(item => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <div
        className={cn(styles.select, active && styles.active)}
        onClick={handleActiveSelect}
        ref={selectRef}
        {...props}
      >
        {data ? <p>{data}</p> : <p className={styles.placeholder}>{placeholder}</p>}
        <ul
          className={cn(
            styles.lists,
            list.length > 4 && styles.long,
            active && isMobile && `${styles.mobile} ${styles.active}`,
          )}
        >
          {active &&
            list.map((l, index) => {
              return (
                <li
                  className={cn(styles.list, isMobile && styles.mobile)}
                  onClick={handleClickList}
                  key={index}
                >
                  {l}
                </li>
              );
            })}
        </ul>

        <div className={cn(styles.caret__wrapper, active && styles.active)}>
          <AiFillCaretRight size={16} />
        </div>
      </div>
    </>
  );
};

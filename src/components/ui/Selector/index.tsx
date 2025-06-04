import React from "react";
import { AiFillCaretRight } from "react-icons/ai";

import { useCheckWidth } from "@/hooks/useCheckWidth";
import { cn } from "@/lib/utils";

import styles from "./style.module.scss";

type Props = {
  list: string[];
  placeholder: string;
  id: string;
  onChange?: (val: unknown) => void;
};

export const Selector = ({
  list,
  placeholder,
  id,
  onChange,
  ...props
}: React.ComponentProps<"div"> & Props) => {
  const selectRef = React.useRef<HTMLDivElement>(null);

  const [data, setData] = React.useState<string>("");
  const [active, setActive] = React.useState<boolean>(false);

  const [isMobile] = useCheckWidth();

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
    if (data && onChange) onChange(data);
  }, [data]);

  return (
    <div style={{ position: "relative" }}>
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
    </div>
  );
};

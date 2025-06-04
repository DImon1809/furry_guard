import React from "react";

import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { useSearchMetroQuery } from "@/store/features/pet/petApi";

import { Input } from "../input";
import { Label } from "../label";

import styles from "./style.module.scss";

type Props = {
  setValue: (val: string) => void;
};

// Todo произвести рефакторинг для metro и breed
export const SearchMetro = ({ setValue }: Props) => {
  const [findedMetro, setFindedMetro] = React.useState<string>("");
  const [pattern, setPattern] = React.useState<string>("");

  const [active, setActive] = React.useState<boolean>(false);
  const [isFinded, setIsFinded] = React.useState<boolean>(false);

  const debounced = useDebounce(pattern);

  const { data: metro } = useSearchMetroQuery(debounced, {
    refetchOnFocus: true,
  });

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setActive(false);
    }
  };

  React.useEffect(() => {
    if (!pattern || findedMetro) setActive(false);
  }, [pattern, findedMetro]);

  React.useEffect(() => {
    if (findedMetro) setValue(findedMetro);

    if (!findedMetro) setValue(pattern);
  }, [pattern, findedMetro]);

  return (
    <>
      <Label htmlFor="metro">Метро</Label>
      <div className={styles.searchMetro__wrapper}>
        <Input
          type="text"
          id="metro"
          placeholder="Введите название метро"
          className="!px-2"
          value={findedMetro && isFinded ? findedMetro : pattern}
          onChange={event => {
            setActive(true);
            setIsFinded(false);
            setValue(event.target.value);
            setPattern(event.target.value);
            setFindedMetro("");
          }}
          onBlur={handleBlur}
        />
        {active && (
          <div
            className={cn(styles.metro__wrapper, metro?.length && metro.length > 3 && styles.long)}
          >
            {metro?.length ? (
              metro.map((b, i) => (
                <div
                  key={i}
                  className={styles.metro}
                  onMouseDown={event => event.preventDefault()}
                  onClick={() => {
                    setIsFinded(true);
                    setFindedMetro(b);
                  }}
                >
                  {b}
                </div>
              ))
            ) : (
              <div className={styles.metro__message}>
                <h3>Метро не найдено</h3>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

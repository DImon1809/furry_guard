import React from "react";

import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { useSearchBreedQuery } from "@/store/features/pet/petApi";

import { Input } from "../input";
import { Label } from "../label";

import styles from "./styles.module.scss";

type Props = {
  setValue: (val: string) => void;
};

export const SearchBreed = ({ setValue }: Props) => {
  const [findedBreed, setFindedBreed] = React.useState<string>("");
  const [pattern, setPattern] = React.useState<string>("");

  const [active, setActive] = React.useState<boolean>(false);
  const [isFinded, setIsFinded] = React.useState<boolean>(false);

  const debounced = useDebounce(pattern);

  const { data: breeds } = useSearchBreedQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setActive(false);
    }
  };

  React.useEffect(() => {
    if (!pattern || findedBreed) setActive(false);
  }, [pattern, findedBreed]);

  React.useEffect(() => {
    if (findedBreed) setValue(findedBreed);

    if (!findedBreed) setValue(pattern);
  }, [pattern, findedBreed]);

  return (
    <>
      <Label htmlFor="breed">Порода</Label>
      <div className={styles.searchBreed__wrapper}>
        <Input
          type="text"
          id="breed"
          placeholder="Введите породу"
          className="!px-2"
          value={findedBreed && isFinded ? findedBreed : pattern}
          onChange={event => {
            setActive(true);
            setIsFinded(false);
            setValue(event.target.value);
            setPattern(event.target.value);
            setFindedBreed("");
          }}
          onBlur={handleBlur}
        />
        {active && (
          <div
            className={cn(
              styles.breeds__wrapper,
              breeds?.length && breeds.length > 3 && styles.long,
            )}
          >
            {breeds?.length ? (
              breeds.map(b => (
                <div
                  className={styles.breed}
                  onMouseDown={event => event.preventDefault()}
                  onClick={() => {
                    setIsFinded(true);
                    setFindedBreed(b);
                  }}
                >
                  {b}
                </div>
              ))
            ) : (
              <div className={styles.breed__message}>
                <h3>Порода не найдена</h3>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

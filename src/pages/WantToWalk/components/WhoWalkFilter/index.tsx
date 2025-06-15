import React from "react";

import { ArrowBack, Button, CustomSelector, Label } from "@/components/ui";
import { SearchBreed, SearchMetro } from "@/components/ui";
import { matcherGender } from "@/lib/matchers";
import type { PetCard } from "@/models/Pet";

import styles from "./style.module.scss";

type Props = {
  isOpen: boolean;
  defaultWalkPets: PetCard[];
  setWalkPets: React.Dispatch<React.SetStateAction<PetCard[]>>;
  handleOpenFilter: () => void;
};

type Options = { value: string; label: string };

export const WhoWalkFilter = ({
  isOpen,
  defaultWalkPets,
  setWalkPets,
  handleOpenFilter,
}: Props) => {
  const [breed, setBreed] = React.useState<string>();
  const [gender, setGender] = React.useState<string>();
  const [metro, setMetro] = React.useState<string>();
  const [sortWalk, setSortWalk] = React.useState<string>();

  const handleSortPets = () => {
    setWalkPets(() => {
      if (metro || sortWalk) return [];

      if (breed || gender) {
        return defaultWalkPets
          .filter(pet => (breed ? pet.breed === breed : true))
          .filter(pet => (gender ? pet.gender === gender : true));
      }

      return defaultWalkPets;
    });
  };

  return (
    <section className={styles.whoWalk__filter}>
      {isOpen && <ArrowBack handler={handleOpenFilter} />}
      <div>
        <SearchBreed setValue={val => setBreed(val)} />
      </div>
      <div>
        <Label htmlFor="who__walk__gender">Пол</Label>
        <CustomSelector
          id="who__walk__gender"
          placeholder="Выберите пол..."
          defaultValue={{
            value: "",
            label: "Не выбрано",
          }}
          options={["Не выбрано", "М", "Ж"].reduce(
            (acc, prev) => [
              ...acc,
              {
                value: prev === "М" || prev === "Ж" ? prev : "",
                label:
                  prev === "М" || prev === "Ж" ? matcherGender(prev as "М" | "Ж" | null) : prev,
              },
            ],
            [] as Options[],
          )}
          onChange={val => setGender(val.value)}
        />
      </div>
      <div>
        <SearchMetro setValue={val => setMetro(val)} />
      </div>

      <div>
        <Label htmlFor="sort__by__walk">Сортировать по совместной прогулке</Label>
        <CustomSelector
          id="sort__by__walk"
          placeholder="Выберите радиус поиска..."
          defaultValue={{
            value: "",
            label: "Не выбрано",
          }}
          options={[
            "Не выбрано",
            "Часто гуляем",
            "Периодически гуляем",
            "Редко гуляем",
            "Ни разу не гуляли",
          ].reduce(
            (acc, prev) => [...acc, { value: prev === "Не выбрано" ? "" : prev, label: prev }],
            [] as Options[],
          )}
          onChange={val => setSortWalk(val.value)}
        />
      </div>

      <Button className="w-64 !mx-auto" onClick={handleSortPets}>
        Показать результаты
      </Button>
    </section>
  );
};

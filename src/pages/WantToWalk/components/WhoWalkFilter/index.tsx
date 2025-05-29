import { ArrowBack, Button, CustomSelector, Label } from "@/components/ui";
import { SearchBreed } from "@/components/ui";
import { matcherGender } from "@/lib/matchers";

import styles from "./style.module.scss";

type Props = {
  isOpen: boolean;
  handleOpenFilter: () => void;
};

type Options = { value: string; label: string };

export const WhoWalkFilter = ({ isOpen, handleOpenFilter }: Props) => {
  return (
    <section className={styles.whoWalk__filter}>
      {isOpen && <ArrowBack handler={handleOpenFilter} />}
      <div>
        <Label htmlFor="who__walk__species">Вид животного</Label>
        <CustomSelector
          id="who__walk__species"
          placeholder="Выберите вид животного..."
          options={["Кот", "Собака", "Жираф", "Тигр"].reduce(
            (acc, prev) => [...acc, { value: prev, label: prev }],
            [] as Options[],
          )}
        />
      </div>
      <div>
        <SearchBreed setValue={() => undefined} />
      </div>
      <div>
        <Label htmlFor="who__walk__gender">Пол</Label>
        <CustomSelector
          id="who__walk__gender"
          placeholder="Выберите пол..."
          options={["М", "Ж"].reduce(
            (acc, prev) => [
              ...acc,
              { value: prev, label: matcherGender(prev as "М" | "Ж" | null) },
            ],
            [] as Options[],
          )}
        />
      </div>
      <div>
        <Label htmlFor="how__far">Как далеко от меня</Label>
        <CustomSelector
          id="how__far"
          placeholder="Выберите радиус поиска..."
          options={["500 метров", "1 километр", "2 километра", "5 километров"].reduce(
            (acc, prev) => [...acc, { value: prev, label: prev }],
            [] as Options[],
          )}
        />
      </div>

      <div>
        <Label htmlFor="sort__by__walk">Сортировать по совместной прогулке</Label>
        <CustomSelector
          id="sort__by__walk"
          placeholder="Выберите радиус поиска..."
          options={[
            "Часто гуляем",
            "Периодически гуляем",
            "Редко гуляем",
            "Ни разу не гуляли",
          ].reduce((acc, prev) => [...acc, { value: prev, label: prev }], [] as Options[])}
        />
      </div>

      <Button className="w-64 !mx-auto">Показать результаты</Button>
    </section>
  );
};

import { Button, CustomSelector, Label } from "@/components/ui";
import { ArrowBack } from "@/components/ui";

import styles from "./style.module.scss";

type Props = {
  isOpen: boolean;
  handleCloseFilter: () => void;
};

type Options = { value: string; label: string };

export const AnimalFilter = ({ isOpen, handleCloseFilter }: Props) => {
  return (
    <section className={styles.animal__filter}>
      {isOpen && <ArrowBack handler={handleCloseFilter} />}
      <div>
        <Label htmlFor="species">Вид животного</Label>
        <CustomSelector
          id="species"
          placeholder="Выберите вид животного..."
          options={["Кот", "Собака", "Жираф", "Тигр"].reduce(
            (acc, prev) => [...acc, { value: prev, label: prev }],
            [] as Options[],
          )}
        />
      </div>

      <div>
        <Label htmlFor="pet__gender">Пол</Label>
        <CustomSelector
          id="pet__gender"
          placeholder="Выберите пол животного..."
          options={["Мальчик", "Девочка"].reduce(
            (acc, prev) => [...acc, { value: prev, label: prev }],
            [] as Options[],
          )}
        />
      </div>

      <div>
        <Label htmlFor="location">Местонахождение</Label>
        <CustomSelector
          id="location"
          placeholder="Выберите местохождение..."
          options={["Дома", "Гуляет"].reduce(
            (acc, prev) => [...acc, { value: prev, label: prev }],
            [] as Options[],
          )}
        />
      </div>

      <div>
        <Label htmlFor="status">Статус</Label>
        <CustomSelector
          id="status"
          placeholder="Выберите статус..."
          options={["Здоров", "Болен"].reduce(
            (acc, prev) => [...acc, { value: prev, label: prev }],
            [] as Options[],
          )}
        />
      </div>

      <div>
        <Label htmlFor="animal-sort">Сортировать</Label>
        <CustomSelector
          id="animal-sort"
          placeholder="Выберите сортировку..."
          options={["По алфавиту", "По возрастанию", "По убыванию", "С конца"].reduce(
            (acc, prev) => [...acc, { value: prev, label: prev }],
            [] as Options[],
          )}
        />
      </div>

      <Button className="w-64 !mx-auto">Показать результаты</Button>
    </section>
  );
};

import { ArrowBack, Button } from "@/components/ui";
import { CustomSelector, Label } from "@/components/ui";

import styles from "./style.module.scss";

type Props = {
  isOpen: boolean;
  handleOpenFilter: () => void;
};

type Options = { value: string; label: string };

export const HospitalFilter = ({ isOpen, handleOpenFilter }: Props) => {
  return (
    <section className={styles.hospital__filter}>
      {isOpen && <ArrowBack handler={handleOpenFilter} />}
      <div>
        <Label htmlFor="rating">По рейтингу</Label>
        <CustomSelector
          id="rating"
          placeholder="Выберите рейтинг..."
          options={["Лучшие", "Худшие"].reduce(
            (acc, prev) => [...acc, { value: prev, label: prev }],
            [] as Options[],
          )}
        />
      </div>

      <div>
        <Label htmlFor="remoteness">Удаленность от дома</Label>
        <CustomSelector
          id="remoteness"
          placeholder="Выберите удаленность..."
          options={["Ближе к дому", "Дальше от дома"].reduce(
            (acc, prev) => [...acc, { value: prev, label: prev }],
            [] as Options[],
          )}
        />
      </div>

      <div>
        <Label htmlFor="working-status">Рабочий статус</Label>
        <CustomSelector
          id="working-status"
          placeholder="Выберите статус..."
          options={["Открытые", "Скоро закроются", "Закрытые"].reduce(
            (acc, prev) => [...acc, { value: prev, label: prev }],
            [] as Options[],
          )}
        />
      </div>

      <div>
        <Label htmlFor="hospital-sort">Сортировать</Label>
        <CustomSelector
          id="hospital-sort"
          placeholder="Выберите сортировку..."
          options={["По алфавиту", "По возрастания", "По убыванию", "С конца"].reduce(
            (acc, prev) => [...acc, { value: prev, label: prev }],
            [] as Options[],
          )}
        />
      </div>

      <Button className="w-64 !mx-auto">Показать результат</Button>
    </section>
  );
};

import { ArrowBack, Button } from "@/components/ui";
import { Label, Selector } from "@/components/ui";

import styles from "./style.module.scss";

type Props = {
  isOpen: boolean;
  handleOpenFilter: () => void;
};

export const HospitalFilter = ({ isOpen, handleOpenFilter }: Props) => {
  return (
    <section className={styles.hospital__filter}>
      {isOpen && <ArrowBack handler={handleOpenFilter} />}
      <div>
        <Label htmlFor="rating">По рейтингу</Label>
        <Selector id="rating" placeholder="Выберите рейтинг..." list={["Лучшие", "Худшие"]} />
      </div>

      <div>
        <Label htmlFor="remoteness">Удаленность от дома</Label>
        <Selector
          id="remoteness"
          placeholder="Выберите удаленность..."
          list={["Ближе к дому", "Дальше от дома"]}
        />
      </div>

      <div>
        <Label htmlFor="working-status">Рабочий статус</Label>
        <Selector
          id="working-status"
          placeholder="Выберите статус..."
          list={["Открытые", "Скоро закроются", "Закрытые"]}
        />
      </div>

      <div>
        <Label htmlFor="hospital-sort">Сортировать</Label>
        <Selector
          id="hospital-sort"
          placeholder="Выберите сортировку..."
          list={["По алфавиту", "По возрастания", "По убыванию", "С конца"]}
        />
      </div>

      <Button className="w-64 !mx-auto">Показать результат</Button>
    </section>
  );
};

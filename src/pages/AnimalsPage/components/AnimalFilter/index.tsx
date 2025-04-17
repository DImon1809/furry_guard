import { Button, Label, Selector } from "@/components/ui";
import { ArrowBack } from "@/components/ui";

import styles from "./style.module.scss";

type Props = {
  isOpen: boolean;
  handleOpenFilter: () => void;
};

export const AnimalFilter = ({ isOpen, handleOpenFilter }: Props) => {
  return (
    <section className={styles.animal__filter}>
      {isOpen && <ArrowBack handler={handleOpenFilter} />}
      <div>
        <Label htmlFor="species">Вид животного</Label>
        <Selector
          id="species"
          placeholder="Выберите вид животного..."
          list={["Кот", "Собака", "Жираф", "Тигр"]}
        />
      </div>

      <div>
        <Label htmlFor="gender">Пол</Label>
        <Selector
          id="gender"
          placeholder="Выберите пол животного..."
          list={["Мальчик", "Девочка"]}
        />
      </div>

      <div>
        <Label htmlFor="location">Место нахождения</Label>
        <Selector id="location" placeholder="Выберите местохождение..." list={["Дома", "Гуляет"]} />
      </div>

      <div>
        <Label htmlFor="status">Статус</Label>
        <Selector id="status" placeholder="Выберите статус..." list={["Здоров", "Болен"]} />
      </div>

      <div>
        <Label htmlFor="animal-sort">Сортировать</Label>
        <Selector
          id="animal-sort"
          placeholder="Выберите сортировку..."
          list={["По алфавиту", "По возрастания", "По убыванию", "С конца"]}
        />
      </div>

      <Button className="w-64 !mx-auto">Показать результат</Button>
    </section>
  );
};

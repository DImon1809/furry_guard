import React from "react";
import { FaFileAlt } from "react-icons/fa";

import { FileUploader } from "@/components/ui";
import { useAppSelector } from "@/store";
import { useGetAllVaccinationsQuery } from "@/store/features/pet/petApi";

import styles from "./style.module.scss";

export const FilesPage = () => {
  const pet = useAppSelector(state => state.pet);

  const { data, refetch } = useGetAllVaccinationsQuery(pet.chosenId!, {
    skip: !pet?.chosenId,
  });

  return (
    <section className={styles.vaccinations}>
      <div className={styles.description}>
        <h3>В данном разделе хранятся списки прививок вашего питомца</h3>
      </div>
      <FileUploader
        petId={pet.chosenId}
        refetch={refetch}
        className={styles.fileUploader__wrapper}
      />
      <div className={styles.files__list__wrapper}>
        <div>
          <h3>Список файлов:</h3>
        </div>
        <ul className={styles.files__list}>
          {data?.length ? (
            data.map((f, i) => (
              <div key={i} className={styles.file}>
                <FaFileAlt size={21} />
                <div>{f.fileName}</div>
              </div>
            ))
          ) : (
            <h4>Файлов пока нет</h4>
          )}
        </ul>
      </div>
    </section>
  );
};

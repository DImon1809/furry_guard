import { toast } from "react-toastify";

import { FormikErrors, FormikValues, useFormikContext } from "formik";

import { FormWrapper } from "@/components/Form/FormWrapper";
import { Button, DatePicker, Input, Label, Selector } from "@/components/ui";
import { Cross } from "@/components/ui";
import { clearFormikErrors, vNotEmpty } from "@/lib/validations";
import type { Pet } from "@/models/Pet";
import { ActivityLevel } from "@/models/Pet";
import { useLazyCurrentQuery } from "@/store/features/currentUser/currentUserApi";
import { useAddPetMutation } from "@/store/features/pet/petApi";

import styles from "./styles.module.scss";

// Todo посмотреть тип
type AddPetForm = Omit<Pet, "gender" | "weight"> & {
  gender: Pet | string;
  kilo: number;
  gramm: number;
};

type Props = {
  className?: string;
  closeModal: () => void;
};

const AddPetModalForm = ({ closeModal }: Props) => {
  const { values, setFieldValue, errors, submitForm } = useFormikContext<FormikValues>();

  const handleSubmit = () => {
    submitForm();
  };

  return (
    <>
      <div className={styles.cross__wrapper} onClick={closeModal}>
        <Cross />
      </div>
      <div>
        <Label htmlFor="pet__name">Кличка</Label>
        <Input
          type="text"
          id="pet__name"
          placeholder="Введите кличку"
          className="!px-2"
          value={values.name}
          onChange={event => setFieldValue("name", event.target.value, !!errors.name)}
        />
        <div className={styles.error__message}>{`${errors.name || ""}`}</div>
      </div>
      <div>
        <Label htmlFor="breed">Порода</Label>
        <Selector
          id="breed"
          placeholder="Выберите местохождение..."
          list={[
            "Американский бульдог",
            "Бульдог",
            "Бульмастиф",
            "Бурбуль",
            "Бультерьер",
            "Стаффордширский бультерьер",
            "Французский бульдог",
          ]}
          onChange={val => setFieldValue("breed", val, !!errors.val)}
        />
        <div className={styles.error__message}>{`${errors.breed || ""}`}</div>
      </div>
      <div>
        <Label htmlFor="gender">Пол</Label>
        <Selector
          id="gender"
          placeholder="Выберите местохождение..."
          list={["М", "Ж"]}
          onChange={val => setFieldValue("gender", val, !!errors.gender)}
        />
        <div className={styles.error__message}>{`${errors.gender || ""}`}</div>
      </div>
      {/* Todo посмотреть label */}
      <div>
        <Label htmlFor="pet__birth">Дата рождения</Label>
        <DatePicker
          id="pet__birth"
          text="Укажите дату рождения"
          value={values.dateOfBirth}
          onChange={val => setFieldValue("dateOfBirth", val, !!errors.dateOfBirth)}
        />
        <div className={styles.error__message}>{`${errors.dateOfBirth || ""}`}</div>
      </div>
      <div>
        <h4>Укажите точный вес питомца</h4>
      </div>
      <div>
        <Label htmlFor="pet__kilo">Килограммы</Label>
        <Input
          type="number"
          id="pet__kilo"
          placeholder="Введите вес в кило"
          className="!px-2"
          value={values.kilo}
          onChange={event => {
            const val = event.target.value;
            if (Number(val) >= 0) setFieldValue("kilo", event.target.value, !!errors.kilo);
          }}
        />
        <div className={styles.error__message}>{`${errors.kilo || ""}`}</div>
      </div>
      <div>
        <Label htmlFor="pet__gramm">Граммы</Label>
        <Input
          type="number"
          id="pet__gramm"
          placeholder="Введите вес в граммах"
          className="!px-2"
          value={values.gramm}
          onChange={event => {
            const val = event.target.value;
            if (Number(val) >= 0) setFieldValue("gramm", event.target.value, !!errors.gramm);
          }}
        />
        <div className={styles.error__message}>{`${errors.gramm || ""}`}</div>
      </div>
      <div>
        <Label htmlFor="activity__level">Активность</Label>
        <Selector
          id="activity__level"
          placeholder="Укажите активность..."
          list={[ActivityLevel.HIGH, ActivityLevel.MEDIUM, ActivityLevel.LOW]}
          onChange={val => setFieldValue("activityLevel", val, !!errors.activityLevel)}
        />
        <div className={styles.error__message}>{`${errors.activityLevel || ""}`}</div>
      </div>
      <Button className="w-52" onClick={handleSubmit}>
        Добавить питомца
      </Button>
    </>
  );
};

export const AddPetModal = ({ closeModal, className }: Props) => {
  const [addPet] = useAddPetMutation();
  const [getCurrent] = useLazyCurrentQuery();

  const initialValues: AddPetForm = {
    name: "",
    breed: "",
    gender: "",
    age: {
      year: 0,
      month: 0,
      week: 0,
    },
    dateOfBirth: "",
    kilo: 0,
    gramm: 0,
    activityLevel: null,
  };

  const validate = (values: AddPetForm): FormikErrors<AddPetForm> => {
    const errors: FormikErrors<AddPetForm> = {};

    const { name, breed, gender, dateOfBirth, kilo, gramm, activityLevel } = values;

    errors.name = vNotEmpty(name);
    errors.breed = vNotEmpty(breed);
    errors.gender = vNotEmpty(gender);
    errors.dateOfBirth = vNotEmpty(dateOfBirth);
    errors.kilo = vNotEmpty(kilo);
    errors.gramm = vNotEmpty(gramm);
    errors.activityLevel = vNotEmpty(activityLevel);

    if (String(kilo).split("")[0] === "0") errors.kilo = "Некорректное число";
    if (String(gramm).split("")[0] === "0") errors.gramm = "Некорректное число";

    return clearFormikErrors(errors);
  };

  const handleSubmit = async (values: AddPetForm) => {
    try {
      const data: Pet = {
        name: values.name,
        breed: values.breed,
        gender: values.gender as Pet["gender"],
        dateOfBirth: values.dateOfBirth,
        age: {
          year: 0,
          month: 0,
          week: 0,
        },
        weight: Number(`${values.kilo}.${values.gramm}`),
        activityLevel: values.activityLevel,
      };

      await addPet(data).unwrap();
      await getCurrent().unwrap();

      closeModal();

      toast.success("Питомец успешно добавлен", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch {
      toast.error("Что-то пошло не так", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <FormWrapper
      className={className}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={validate}
    >
      <AddPetModalForm closeModal={closeModal} />
    </FormWrapper>
  );
};

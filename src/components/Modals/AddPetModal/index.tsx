import React from "react";
import { toast } from "react-toastify";

import { FormikErrors, FormikValues, useFormikContext } from "formik";

import { FormWrapper } from "@/components/Form/FormWrapper";
import {
  Button,
  Checkbox,
  Cross,
  CustomSelector,
  DatePicker,
  Input,
  Label,
  SearchBreed,
  TimeSelector,
} from "@/components/ui";
import { matcherActivity, matcherGender } from "@/lib/matchers";
import { clearFormikErrors, vNotEmpty } from "@/lib/validations";
import type { Pet, SendPet } from "@/models/Pet";
import { ActivityLevel } from "@/models/Pet";
import { useLazyCurrentQuery } from "@/store/features/currentUser/currentUserApi";
import { useAddPetMutation } from "@/store/features/pet/petApi";

import styles from "./style.module.scss";

// Todo посмотреть тип
type AddPetForm = Omit<
  Pet,
  | "id"
  | "gender"
  | "weight"
  | "age"
  | "files"
  | "walks"
  | "petWalkingStatus"
  | "recommendations"
  | "hasRecommendations"
  | "vaccinations"
> & {
  gender: Pet | string;
  kilo: number;
  gramm: number;
  year: number;
  month: number;
  week: number;
  feed: number;
  exactActivity: number;
};

type AddPetModalForm = {
  isNoBirth: boolean;
  isNoActivity: boolean;
  className?: string;
  closeModal: () => void;
  setIsNoBirth: React.Dispatch<React.SetStateAction<boolean>>;
  setIsNoActivity: React.Dispatch<React.SetStateAction<boolean>>;
};

type AddPetModalProps = {
  className?: string;
  closeModal: () => void;
};

type Options = { value: string; label: string };

const AddPetModalForm = ({
  isNoBirth,
  isNoActivity,
  closeModal,
  setIsNoBirth,
  setIsNoActivity,
}: AddPetModalForm) => {
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
        <SearchBreed setValue={val => setFieldValue("breed", val, !!errors.breed)} />
        <div className={styles.error__message}>{`${errors.breed || ""}`}</div>
      </div>
      <div>
        <Label htmlFor="gender">Пол</Label>
        <CustomSelector
          id="gender"
          placeholder="Выберите местонахождение..."
          options={["М", "Ж"].reduce(
            (acc, prev) => [
              ...acc,
              { value: prev, label: matcherGender(prev as "М" | "Ж" | null) },
            ],
            [] as Options[],
          )}
          onChange={val => setFieldValue("gender", val.value, !!errors.gender)}
        />
        <div className={styles.error__message}>{`${errors.gender || ""}`}</div>
      </div>
      {/* Todo посмотреть label */}
      <div className={styles.checkbox__wrapper}>
        <Checkbox checked={isNoBirth} onChange={val => setIsNoBirth(val as boolean)} />
        <h3>Не помню точную дату рождения</h3>
      </div>
      {!isNoBirth && (
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
      )}
      {isNoBirth && (
        <div className={styles.isNoBirth__wrapper}>
          <h3>Укажите примерный возраст</h3>
          <div>
            <Label htmlFor="pet__year">Годы</Label>
            <Input
              type="number"
              id="pet__year"
              placeholder="Введите количество лет"
              className="!px-2"
              value={values.year}
              onChange={event => {
                const val = event.target.value;

                if (/^\d{0,3}$/.test(val)) {
                  const cleaned = val.replace(/^0+(\d)/, "$1");

                  if (cleaned === "" || Number(cleaned) <= 100)
                    setFieldValue("year", cleaned, !!errors.year);
                }
              }}
            />
            <div className={styles.error__message}>{`${errors.year || ""}`}</div>
          </div>
          <div>
            <Label htmlFor="pet__month">Месяцы</Label>
            <Input
              type="number"
              id="pet__month"
              placeholder="Введите количество месяцев"
              className="!px-2"
              value={values.month}
              onChange={event => {
                const val = event.target.value;
                if (/^\d{0,2}$/.test(val)) {
                  const cleaned = val.replace(/^0+(\d)/, "$1");

                  if (cleaned === "" || Number(cleaned) <= 12)
                    setFieldValue("month", cleaned, !!errors.month);
                }
              }}
            />
            <div className={styles.error__message}>{`${errors.month || ""}`}</div>
          </div>
          <div>
            <Label htmlFor="pet__week">Недели</Label>
            <Input
              type="number"
              id="pet__week"
              placeholder="Введите количесво недель"
              className="!px-2"
              value={values.week}
              onChange={event => {
                const val = event.target.value;

                if (/^\d{0,2}$/.test(val)) {
                  const cleaned = val.replace(/^0+(\d)/, "$1");

                  if (cleaned === "" || Number(cleaned) <= 52)
                    setFieldValue("week", cleaned, !!errors.week);
                }
              }}
            />
            <div className={styles.error__message}>{`${errors.week || ""}`}</div>
          </div>
        </div>
      )}
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

            if (/^\d{0,2}$/.test(val)) {
              const cleaned = val.replace(/^0+(\d)/, "$1");

              if (Number(cleaned) >= 0) setFieldValue("kilo", cleaned, !!errors.kilo);
            }
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

            if (/^\d{0,3}$/.test(val)) {
              const cleaned = val.replace(/^0+(\d)/, "$1");

              if (Number(cleaned) >= 0) setFieldValue("gramm", cleaned, !!errors.gramm);
            }
          }}
        />
        <div className={styles.error__message}>{`${errors.gramm || ""}`}</div>
      </div>
      <div>
        <Label htmlFor="pet__feed">Питание питомца в граммах</Label>
        <Input
          type="number"
          id="pet__feed"
          placeholder="Введите количество корма"
          className="!px-2"
          value={values.feed}
          onChange={event => {
            const val = event.target.value;

            if (/^\d{0,4}$/.test(val)) {
              const cleaned = val.replace(/^0+(\d)/, "$1");

              if (Number(cleaned) >= 0) setFieldValue("feed", cleaned, !!errors.feed);
            }
          }}
        />
        <div className={styles.error__message}>{`${errors.feed || ""}`}</div>
      </div>

      {!isNoActivity && (
        <div>
          <Label htmlFor="activity__level">Активность</Label>
          <CustomSelector
            id="activity__level"
            placeholder="Укажите активность..."
            options={[ActivityLevel.HIGH, ActivityLevel.MEDIUM, ActivityLevel.LOW].reduce(
              (acc, prev) => [...acc, { value: prev, label: matcherActivity(prev) }],
              [] as Options[],
            )}
            onChange={val => setFieldValue("activityLevel", val.value, !!errors.activityLevel)}
          />
          <div className={styles.error__message}>{`${errors.activityLevel || ""}`}</div>
        </div>
      )}
      {isNoActivity && (
        <div>
          <Label htmlFor="exactActivity">Укажите примерное время активности за сутки</Label>
          <TimeSelector
            id="exactActivity"
            onChange={val => setFieldValue("exactActivity", val, !!errors.exactActivity)}
          />
          <div className={styles.error__message}>{`${errors.exactActivity || ""}`}</div>
        </div>
      )}
      <div className={styles.checkbox__wrapper}>
        <Checkbox checked={isNoActivity} onChange={val => setIsNoActivity(val as boolean)} />
        <h3>Не помню точную активность</h3>
      </div>
      <Button className="w-52" onClick={handleSubmit}>
        Добавить питомца
      </Button>
    </>
  );
};

export const AddPetModal = ({ closeModal, className }: AddPetModalProps) => {
  const [addPet] = useAddPetMutation();
  const [getCurrent] = useLazyCurrentQuery();

  const [isNoBirth, setIsNoBirth] = React.useState<boolean>(false);
  const [isNoActivity, setIsNoActivity] = React.useState<boolean>(false);

  const initialValues: AddPetForm = {
    name: "",
    breed: "",
    gender: "",
    year: 0,
    month: 0,
    week: 0,
    dateOfBirth: "",
    kilo: 0,
    gramm: 0,
    feed: 0,
    activityLevel: null,
    exactActivity: 0,
  };

  const validate = (values: AddPetForm): FormikErrors<AddPetForm> => {
    const errors: FormikErrors<AddPetForm> = {};

    const { name, breed, gender, dateOfBirth, kilo, gramm, feed, activityLevel, exactActivity } =
      values;

    errors.name = vNotEmpty(name);
    errors.breed = vNotEmpty(breed);
    errors.gender = vNotEmpty(gender);
    errors.dateOfBirth = vNotEmpty(dateOfBirth);
    errors.kilo = vNotEmpty(kilo);
    errors.gramm = vNotEmpty(gramm);
    errors.feed = vNotEmpty(feed);

    if (!isNoBirth) {
      errors.dateOfBirth = vNotEmpty(dateOfBirth);
    }

    if (isNoBirth) {
      errors.dateOfBirth = undefined;
    }

    if (!isNoActivity) {
      errors.activityLevel = vNotEmpty(activityLevel);
      errors.exactActivity = undefined;
    }

    if (isNoActivity) {
      errors.activityLevel = undefined;
      errors.exactActivity = vNotEmpty(exactActivity);
    }

    return clearFormikErrors(errors);
  };

  const handleSubmit = async (values: AddPetForm) => {
    try {
      const data: SendPet = {
        name: values.name,
        breed: values.breed,
        gender: values.gender as Pet["gender"],
        dateOfBirth: values.dateOfBirth,
        age: {
          year: values.year,
          month: values.month,
          week: values.week,
        },
        weight: Number(`${values.kilo}.${values.gramm}`),
        feed: Number(values.feed),
        activityLevel: values.activityLevel || ActivityLevel.LOW,
        exactActivity: values.exactActivity,
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
      <AddPetModalForm
        isNoBirth={isNoBirth}
        isNoActivity={isNoActivity}
        setIsNoBirth={setIsNoBirth}
        setIsNoActivity={setIsNoActivity}
        closeModal={closeModal}
      />
    </FormWrapper>
  );
};

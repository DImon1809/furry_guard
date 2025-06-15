import React from "react";
import { toast } from "react-toastify";

import type { FormikErrors, FormikValues } from "formik";
import { useFormikContext } from "formik";

import { FormWrapper } from "@/components/Form/FormWrapper";
import {
  Button,
  Checkbox,
  Cross,
  CustomSelector,
  DatePicker,
  Input,
  Label,
  TimeSelector,
} from "@/components/ui";
import type { Option } from "@/components/ui/CustomSelector";
import { matcherActivity } from "@/lib/matchers";
import { clearFormikErrors, vNotEmpty } from "@/lib/validations";
import { ActivityLevel } from "@/models/Pet";
import { useAppSelector } from "@/store";
import { useLazyGetOnePetQuery, useUpdatePetDataMutation } from "@/store/features/pet/petApi";

import styles from "./style.module.scss";

type EditPetType = {
  dateOfBirth: string | null;
  year: number;
  month: number;
  week: number;
  kilo: number;
  gramm: number;
  feed: number;
  activityLevel: ActivityLevel | null;
  exactActivity: number;
};

type EditPetInfoModalForm = {
  isNoBirth: boolean;
  isNoActivity: boolean;
  closeModal: () => void;
  setIsNoBirth: React.Dispatch<React.SetStateAction<boolean>>;
  setIsNoActivity: React.Dispatch<React.SetStateAction<boolean>>;
};

type EditPetInfoModal = {
  className: string;
  closeModal: () => void;
};

export const EditPetInfoModalForm = ({
  isNoBirth,
  isNoActivity,
  closeModal,
  setIsNoBirth,
  setIsNoActivity,
}: EditPetInfoModalForm) => {
  const { values, setFieldValue, errors, submitForm } = useFormikContext<FormikValues>();

  const handleSubmit = () => {
    submitForm();
  };

  // Todo выполнить рефакторинг
  return (
    <>
      <div className={styles.cross__wrapper} onClick={closeModal}>
        <Cross />
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
      <div className={styles.checkbox__wrapper}>
        <Checkbox checked={isNoBirth} onChange={val => setIsNoBirth(val as boolean)} />
        <h3>Не помню точную дату рождения</h3>
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
            defaultValue={{
              value: values.activityLevel,
              label: matcherActivity(values.activityLevel),
            }}
            options={[ActivityLevel.HIGH, ActivityLevel.MEDIUM, ActivityLevel.LOW].reduce(
              (acc, prev) => [...acc, { value: prev, label: matcherActivity(prev) }],
              [] as Option[],
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
        Изменить данные
      </Button>
    </>
  );
};

export const EditPetInfoModal = ({ className, closeModal }: EditPetInfoModal) => {
  const pet = useAppSelector(state => state.pet);

  const [updatePetData] = useUpdatePetDataMutation();
  const [getOnePet] = useLazyGetOnePetQuery();

  const [isNoBirth, setIsNoBirth] = React.useState<boolean>(false);
  const [isNoActivity, setIsNoActivity] = React.useState<boolean>(false);

  const initialValues = React.useMemo(() => {
    const temp = String(pet.weight).split(".");

    const kilo = temp?.[0] ? Number(temp[0]) : 0;
    const gramm = temp?.[1] ? Number(temp[1]) : 0;

    return {
      dateOfBirth: pet.dateOfBirth,
      year: pet.age?.year || 0,
      month: pet.age?.month || 0,
      week: pet.age?.week || 0,
      kilo,
      gramm,
      feed: pet.feed,
      activityLevel: pet.activityLevel ? pet.activityLevel : null,
      exactActivity: pet.exactActivity,
    };
  }, [pet]);

  const validate = (values: EditPetType) => {
    const errors: FormikErrors<EditPetType> = {};

    const { dateOfBirth, kilo, gramm, activityLevel, feed } = values;

    errors.kilo = vNotEmpty(kilo);
    errors.gramm = vNotEmpty(gramm);
    errors.activityLevel = vNotEmpty(activityLevel);
    errors.feed = vNotEmpty(feed);

    if (!isNoBirth) {
      errors.dateOfBirth = vNotEmpty(dateOfBirth);
    }

    if (isNoBirth) {
      errors.dateOfBirth = undefined;
    }

    return clearFormikErrors(errors);
  };

  const handleSubmit = async (values: EditPetType) => {
    try {
      const data: {
        id: number;
        body: {
          dateOfBirth: string | null;
          age: {
            year: number;
            month: number;
            week: number;
          };
          weight: number;
          feed: number;
          activityLevel: ActivityLevel;
          exactActivity: number;
        };
      } = {
        id: pet.chosenId!,
        body: {
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
        },
      };

      await updatePetData(data).unwrap();
      await getOnePet({ id: pet.chosenId! }).unwrap();

      closeModal();

      toast.success("Данные питомца успешно обновлены", {
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
      validate={validate}
      onSubmit={handleSubmit}
    >
      <EditPetInfoModalForm
        isNoBirth={isNoBirth}
        isNoActivity={isNoActivity}
        setIsNoBirth={setIsNoBirth}
        setIsNoActivity={setIsNoActivity}
        closeModal={closeModal}
      />
    </FormWrapper>
  );
};

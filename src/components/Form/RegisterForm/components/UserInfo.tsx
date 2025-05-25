import { FormikValues, useFormikContext } from "formik";

import { DatePicker, Input, Label } from "@/components/ui";

import styles from "../style.module.scss";

export const UserInfo = () => {
  const { values, setFieldValue, errors } = useFormikContext<FormikValues>();

  return (
    <>
      <div>
        <Label htmlFor="first__name">Имя</Label>
        <Input
          type="text"
          id="first__name"
          placeholder="Введите имя"
          className="!px-2"
          value={values.firstName}
          onChange={event => setFieldValue("firstName", event.target.value, !!errors.firstName)}
        />
        <div className={styles.error__message}>{`${errors.firstName || ""}`}</div>
      </div>
      <div>
        <Label htmlFor="last__name">Фамилия</Label>
        <Input
          type="text"
          id="last__name"
          placeholder="Введите фамилию"
          className="!px-2"
          value={values.lastName}
          onChange={event => setFieldValue("lastName", event.target.value, !!errors.lastName)}
        />
        <div className={styles.error__message}>{`${errors.lastName || ""}`}</div>
      </div>
      <div>
        <Label htmlFor="surname">Отчество</Label>
        <Input
          type="text"
          id="surname"
          placeholder="Введите отчество"
          className="!px-2"
          value={values.surname}
          onChange={event => setFieldValue("surname", event.target.value, !!errors.surname)}
        />
        <div className={styles.error__message}>{`${errors.surname || ""}`}</div>
      </div>
      <div>
        <Label htmlFor="date__picker">Дата рождения</Label>
        <DatePicker
          id="date__picker"
          text="Укажите дату рождения"
          value={values.dateOfBirth}
          onChange={val => setFieldValue("dateOfBirth", val, !!errors.dateOfBirth)}
        />
        <div className={styles.error__message}>{`${errors.dateOfBirth || ""}`}</div>
      </div>
    </>
  );
};

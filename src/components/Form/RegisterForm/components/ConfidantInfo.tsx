import React from "react";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";

import { FormikValues, useFormikContext } from "formik";

import { Input, Label } from "@/components/ui";

import styles from "../style.module.scss";

enum password_types {
  password = "password",
  text = "text",
}

type types = keyof typeof password_types;

export const ConfidantInfo = () => {
  const { values, setFieldValue, errors } = useFormikContext<FormikValues>();

  const [passwordType, setPasswordType] = React.useState<types>(password_types.password);
  const [repetPasswordType, setRepetType] = React.useState<types>(password_types.password);

  const changerPasswordType = () => {
    if (passwordType === password_types.password) return setPasswordType(password_types.text);

    return setPasswordType(password_types.password);
  };

  const changerRepetType = () => {
    if (repetPasswordType === password_types.password) return setRepetType(password_types.text);

    return setRepetType(password_types.password);
  };

  return (
    <>
      <div>
        <Label htmlFor="email">Почта</Label>
        <Input
          type="email"
          id="email"
          placeholder="Введите почту"
          className="!px-2"
          value={values.email}
          onChange={event => setFieldValue("email", event.target.value, !!values.email)}
        />
        <div className={styles.error__message}>{`${errors.email || ""}`}</div>
      </div>
      <div className={styles.password__wrapper}>
        <Label htmlFor="password">Пароль</Label>
        <Input
          type={passwordType}
          id="password"
          placeholder="Придумайте пароль"
          className="!px-2"
          value={values.password}
          onChange={event => setFieldValue("password", event.target.value, !!values.password)}
        />
        <div className={styles.error__message}>{`${errors.password || ""}`}</div>

        <div className={styles.eye__wrapper} onClick={changerPasswordType}>
          {passwordType === password_types.password ? (
            <RiEyeFill size={20} />
          ) : (
            <RiEyeCloseFill size={20} />
          )}
        </div>
      </div>
      <div className={styles.password__wrapper}>
        <Label htmlFor="repet__password">Повторный пароль</Label>
        <Input
          type={repetPasswordType}
          id="repet__password"
          placeholder="Повторите пароль"
          className="!px-2"
          value={values.repeatPassword}
          onChange={event =>
            setFieldValue("repeatPassword", event.target.value, !!values.repeatPassword)
          }
        />
        <div className={styles.error__message}>{`${errors.repeatPassword || ""}`}</div>

        <div className={styles.eye__wrapper} onClick={changerRepetType}>
          {repetPasswordType === password_types.password ? (
            <RiEyeFill size={20} />
          ) : (
            <RiEyeCloseFill size={20} />
          )}
        </div>
      </div>
    </>
  );
};

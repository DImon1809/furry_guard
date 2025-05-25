import React from "react";
import { RiEyeFill } from "react-icons/ri";
import { RiEyeCloseFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { FormikErrors, FormikValues, useFormikContext } from "formik";

import { Button, Input, Label } from "@/components/ui";
import { ArrowBack } from "@/components/ui";
import { clearFormikErrors, vEmail } from "@/lib/validations";
import type { RegisterType } from "@/models/AuthTypes";
import { useLoginMutation } from "@/store/features/auth/authApi";

import { FormWrapper } from "../FormWrapper";

import styles from "./style.module.scss";

enum password_types {
  password = "password",
  text = "text",
}

type types = keyof typeof password_types;

type LoginType = Pick<RegisterType, "email" | "password">;

const LoginFormWrapper = () => {
  const { values, setFieldValue, errors, submitForm } = useFormikContext<FormikValues>();

  const navigate = useNavigate();

  const [passwordType, setPasswordType] = React.useState<types>("password");

  const goBack = () => {
    navigate(-1);
  };

  const changerType = () => {
    if (passwordType === password_types.password) return setPasswordType(password_types.text);

    return setPasswordType(password_types.password);
  };

  const handleSubmit = () => {
    submitForm();
  };

  return (
    <>
      <ArrowBack handler={goBack} />
      <div className={styles.email__wrapper}>
        <Label htmlFor="email">Почта</Label>
        <Input
          type="email"
          id="email"
          placeholder="Почта"
          className="!px-2"
          value={values.email}
          onChange={event => setFieldValue("email", event.target.value, !!errors.email)}
        />
        <div className={styles.error__message}>{`${errors.email || ""}`}</div>
      </div>
      <div className={styles.password__wrapper}>
        <Label htmlFor="password">Пароль</Label>
        <Input
          type={passwordType}
          id="password"
          placeholder="Пароль"
          className="!pl-2 !pr-3"
          value={values.password}
          onChange={event => setFieldValue("password", event.target.value, !!errors.password)}
        />
        <div className={styles.error__message}>{`${errors.password || ""}`}</div>

        <div className={styles.eye__wrapper} onClick={changerType}>
          {passwordType === password_types.password ? (
            <RiEyeFill size={20} />
          ) : (
            <RiEyeCloseFill size={20} />
          )}
        </div>
      </div>
      <Button className={"w-32"} onClick={handleSubmit}>
        Войти
      </Button>
    </>
  );
};

export const LoginForm = () => {
  const [login] = useLoginMutation();

  const navigate = useNavigate();

  const initialValues: LoginType = {
    email: "",
    password: "",
  };

  const validate = (values: LoginType): FormikErrors<LoginType> => {
    const errors: FormikErrors<LoginType> = {};

    const { email, password } = values;

    errors.email = vEmail(email);
    errors.password = password.length > 6 ? undefined : "Пароль должен быть больше 6 символов";

    return clearFormikErrors(errors);
  };

  const handleSubmit = async (values: LoginType) => {
    try {
      await login(values).unwrap();

      navigate("/");

      toast.success("Вы успешно авторизовались", {
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
      toast.error("Неверный логин или пароль", {
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
    <FormWrapper initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
      <LoginFormWrapper />
    </FormWrapper>
  );
};

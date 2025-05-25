import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { FormikErrors, useFormikContext } from "formik";

import { Button } from "@/components/ui";
import { ArrowBack } from "@/components/ui";
import { clearFormikErrors, vEmail, vNotEmpty } from "@/lib/validations";
import { RegisterType } from "@/models/AuthTypes";
import { useRegisterMutation } from "@/store/features/auth/authApi";

import { FormWrapper } from "../FormWrapper";

import { ConfidantInfo } from "./components/ConfidantInfo";
import { UserInfo } from "./components/UserInfo";

type RegisterFromType = RegisterType & {
  repeatPassword: string;
};

type Props = {
  children?: React.ReactNode;
};

const RegisterFormWrapper = ({ children }: Props) => {
  const { submitForm } = useFormikContext();

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <ArrowBack handler={goBack} />
      {children}
      <UserInfo />
      <ConfidantInfo />

      {children ? (
        <Button className="w-52">Редактировать профиль</Button>
      ) : (
        <Button
          className="w-52"
          onClick={() => {
            submitForm();
          }}
        >
          Зарегистрироваться
        </Button>
      )}
    </>
  );
};

export const RegisterForm = ({ children }: Props) => {
  const navigate = useNavigate();

  const [register] = useRegisterMutation();

  const initialValues: RegisterFromType = {
    firstName: "",
    surname: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    dateOfBirth: "",
  };

  const validate = (values: RegisterFromType): FormikErrors<RegisterFromType> => {
    const errors: FormikErrors<RegisterFromType> = {};

    const { firstName, lastName, surname, dateOfBirth, email, password, repeatPassword } = values;

    errors.firstName = vNotEmpty(firstName);
    errors.lastName = vNotEmpty(lastName);
    errors.surname = vNotEmpty(surname);
    errors.dateOfBirth = vNotEmpty(dateOfBirth);
    errors.email = vEmail(email);
    errors.password = password.length > 6 ? undefined : "Пароль должен быть больше 6 символов";
    errors.repeatPassword =
      repeatPassword && password === repeatPassword ? undefined : "Пароли должны совпадать";

    return clearFormikErrors(errors);
  };

  const handleSubmit = async (values: RegisterFromType) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { repeatPassword, ...data } = values;

      await register(data).unwrap();

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
    <FormWrapper initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
      <RegisterFormWrapper>{children}</RegisterFormWrapper>
    </FormWrapper>
  );
};

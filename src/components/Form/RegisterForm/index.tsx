import React from "react";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";

import { Button, Input, Label } from "@/components/ui";
import { ArrowBack } from "@/components/ui";
import { DatePicker } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";

import { FormWrapper } from "../FormWrapper";

import styles from "./style.module.scss";

enum password_types {
  password = "password",
  text = "text",
}

type types = keyof typeof password_types;

type Props = {
  children?: React.ReactNode;
};

export const RegisterForm = ({ children }: Props) => {
  const { logIn } = useAuth();

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

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    logIn();
  };

  return (
    <FormWrapper>
      <ArrowBack />
      {children}
      <div>
        <Label htmlFor="first__name">Имя</Label>
        <Input type="text" id="first__name" placeholder="Введите имя" className="!px-2" />
      </div>
      <div>
        <Label htmlFor="last__name">Фамилия</Label>
        <Input type="text" id="last__name" placeholder="Введите фамилию" className="!px-2" />
      </div>
      <div>
        <Label htmlFor="surname">Отчество</Label>
        <Input type="text" id="surname" placeholder="Введите отчество" className="!px-2" />
      </div>
      <div>
        <Label htmlFor="surname">Дата рождения</Label>
        <DatePicker id="date__picker" text="Укажите дату рождения" />
      </div>
      <div>
        <Label htmlFor="email">Почта</Label>
        <Input type="email" id="email" placeholder="Введите почту" className="!px-2" />
      </div>
      <div className={styles.password__wrapper}>
        <Label htmlFor="password">Пароль</Label>
        <Input
          type={passwordType}
          id="password"
          placeholder="Придумайте пароль"
          className="!px-2"
        />
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
        />
        <div className={styles.eye__wrapper} onClick={changerRepetType}>
          {repetPasswordType === password_types.password ? (
            <RiEyeFill size={20} />
          ) : (
            <RiEyeCloseFill size={20} />
          )}
        </div>
      </div>
      <Button className="w-52" onClick={handleSubmit}>
        Зарегистрироваться
      </Button>
    </FormWrapper>
  );
};

import React from "react";
import { RiEyeFill } from "react-icons/ri";
import { RiEyeCloseFill } from "react-icons/ri";

import { Button, Input, Label } from "@/components/ui";
import { ArrowBack } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";

import { FormWrapper } from "../FormWrapper";

import styles from "./style.module.scss";

enum password_types {
  password = "password",
  text = "text",
}

type types = keyof typeof password_types;

export const LoginForm = () => {
  const { logIn } = useAuth();

  const [passwordType, setPasswordType] = React.useState<types>("password");

  const changerType = () => {
    if (passwordType === password_types.password) return setPasswordType(password_types.text);

    return setPasswordType(password_types.password);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    logIn();
  };

  return (
    <FormWrapper>
      <ArrowBack />
      <div className={styles.email__wrapper}>
        <Label htmlFor="email">Почта</Label>
        <Input type="email" id="email" placeholder="Почта" className="!px-2" />
      </div>
      <div className={styles.password__wrapper}>
        <Label htmlFor="password">Пароль</Label>
        <Input type={passwordType} id="password" placeholder="Пароль" className="!pl-2 !pr-3" />
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
    </FormWrapper>
  );
};

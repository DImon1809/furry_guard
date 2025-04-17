import { LoginForm } from "@/components/Form/LoginForm";
import { RegisterForm } from "@/components/Form/RegisterForm";
import { AUTH_TYPES, AuthTypes } from "@/models";

type Props = {
  type: AuthTypes;
};

export const FormRouter = ({ type }: Props) => {
  switch (type) {
    case AUTH_TYPES.LOGIN:
      return <LoginForm />;
    case AUTH_TYPES.REGISTER:
      return <RegisterForm />;
    default:
      return null;
  }
};

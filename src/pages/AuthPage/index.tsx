import React from "react";

import { FormRouter } from "@/components/Form/FormRouter";
import { AuthTypes } from "@/models";

type Props = {
  type: AuthTypes;
};

export const AuthPage = ({ type }: Props) => {
  return <FormRouter type={type} />;
};

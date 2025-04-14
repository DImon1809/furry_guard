export enum AUTH_TYPES {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
}

export type AuthTypes = keyof typeof AUTH_TYPES;

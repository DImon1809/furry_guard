/// <reference types="vite/client" />

declare module "*.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

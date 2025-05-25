const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;

export const vEmail = (val: string): string | undefined => {
  if (!val) return "Введите email";

  const isError = !emailRegex.test(val);

  return isError ? "Email заполнен некорректно" : undefined;
};

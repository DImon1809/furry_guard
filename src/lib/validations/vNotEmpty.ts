export const vNotEmpty = (val: unknown, errorText?: string): string | undefined => {
  return val ? undefined : errorText || "Обязательное поле";
};

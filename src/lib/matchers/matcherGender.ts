const genders = {
  М: "Мальчик",
  Ж: "Девочка",
};

export const matcherGender = (gender: "М" | "Ж" | null) =>
  gender ? genders[gender] : "Пол не указан";

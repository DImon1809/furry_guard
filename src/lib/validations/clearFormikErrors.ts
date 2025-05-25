import { FormikErrors, FormikValues } from "formik";

export function clearFormikErrors<T extends FormikValues>(
  errors: FormikErrors<T>,
): FormikErrors<T> {
  return Object.keys(errors).reduce((acc, key) => {
    const error = errors[key];

    if (!error) return acc;

    return {
      ...acc,
      [key]: error,
    };
  }, {} as FormikErrors<T>);
}

import React from "react";

import { FormikErrors, FormikProvider, FormikValues, useFormik } from "formik";

import styles from "./style.module.scss";

type Props<V extends FormikValues = FormikValues> = {
  children: React.ReactNode;
  initialValues: V;
  onSubmit: (values: V) => void;
  validate: (values: V) => void | FormikErrors<V> | Promise<FormikErrors<V>>;
};

export function FormWrapper<V extends FormikValues = FormikValues>({
  validate,
  initialValues,
  onSubmit,
  children,
}: Props<V>) {
  const formik = useFormik<V>({
    validate,
    validateOnChange: false,
    initialValues,
    enableReinitialize: true,
    onSubmit,
  });

  return (
    <FormikProvider value={formik}>
      <div className={styles.form}>{children}</div>
    </FormikProvider>
  );
}

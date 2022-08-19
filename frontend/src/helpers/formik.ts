import { FormikValues, useFormikContext } from 'formik';

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const formikPropsErrors = (filed: string, formik?: any) => {
  const context = formik ?? useFormikContext<FormikValues>();
  const { touched, errors } = context;

  return {
    name: filed,
    error: touched[filed] && !!errors[filed],
    helperText:
      touched[filed] && errors[filed] ? errors[filed]?.toString() : '',
  };
};

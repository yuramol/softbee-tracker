import { FormikErrors, FormikTouched, FormikValues } from 'formik';

type Formik = {
  errors: FormikErrors<FormikValues>;
  touched: FormikTouched<FormikValues>;
};

//@ts-nocheck
export const useFormikPropsErrors = (formik: Formik) => {
  const { touched, errors } = formik;

  const getPropsErrors = (field: string) => ({
    error: touched[field] && !!errors[field],
    helperText:
      touched[field] && errors[field] ? errors[field]?.toString() : '',
  });

  return {
    getPropsErrors,
  };
};

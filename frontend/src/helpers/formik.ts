import {
  FormikErrors,
  FormikTouched,
  FormikValues,
  useFormikContext,
} from 'formik';

type Formik = {
  errors: FormikErrors<FormikValues>;
  touched: FormikTouched<FormikValues>;
};

//@ts-nocheck
export const useFormikPropsErrors = ( formik?: Formik) => {
  const context = formik ?? useFormikContext<FormikValues>();
  const { touched, errors } = context;

  const getPropsErrors = (field: string) => ({
    error: touched[field] && !!errors[field],
    helperText:
      touched[field] && errors[field] ? errors[field]?.toString() : '',
  });

  return {
    getPropsErrors,
  };
};

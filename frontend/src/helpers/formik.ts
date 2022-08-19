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
export const formikPropsErrors = (filed: string, formik?: Formik) => {
  const context = formik ?? useFormikContext<FormikValues>();
  const { touched, errors } = context;

  return {
    error: touched[filed] && !!errors[filed],
    helperText:
      touched[filed] && errors[filed] ? errors[filed]?.toString() : '',
  };
};

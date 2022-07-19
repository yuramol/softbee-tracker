import React from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../api';
import {
  Container,
  Grid,
  Stack,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';

type LoginValues = {
  identifier: string;
  password: string;
};

type SubmitActions = {
  setSubmitting: (isSubmitting: boolean) => void;
};

export const LoginPage = () => {
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async (
    values: LoginValues,
    { setSubmitting }: SubmitActions
  ) => {
    await login({ variables: { input: values } });

    if (data) {
      values.identifier = '';
      values.password = '';
      setSubmitting(false);
    }
  };

  const validationSchema = yup.object({
    identifier: yup
      .string()
      .email('Please enter a valid e-mail address')
      .required('Should not be empty'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Should not be empty'),
  });

  return (
    <Container>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={10} sm={8} md={5}>
          <Formik
            initialValues={{ identifier: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Stack
                spacing={4}
                component="form"
                paddingY="180px"
                onSubmit={handleSubmit}
              >
                <Typography variant="h4" component="h1" align="center">
                  Login
                </Typography>
                {!!error && (
                  <Typography align="center" color="red" fontSize={12}>
                    {error.message}
                  </Typography>
                )}
                <TextField
                  variant="outlined"
                  label="Email"
                  type="email"
                  name="identifier"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.identifier}
                  error={touched.identifier && !!errors.identifier}
                  helperText={touched.identifier && errors.identifier}
                />
                <TextField
                  variant="outlined"
                  label="Password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                />
                <Button
                  variant="contained"
                  type="submit"
                  size="large"
                  disabled={isSubmitting}
                >
                  {loading ? 'Loading...' : 'Login'}
                </Button>
              </Stack>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Container>
  );
};

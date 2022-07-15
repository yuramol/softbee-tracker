import React from 'react';
import { TextField, Button, Container, Stack, Typography } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';

export const LoginPage = () => {
  // const handleSubmit = (e) => {
  //   console.log(e);
  // };

  const validationSchema = yup.object({
    email: yup
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
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log(values);
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Stack
            component={'form'}
            spacing={3}
            paddingY={'100px'}
            maxWidth={500}
            marginX={'auto'}
            onSubmit={handleSubmit}
          >
            <Typography variant="h4" textAlign={'center'}>
              Login
            </Typography>
            <TextField
              variant="outlined"
              label="Email"
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              variant="outlined"
              label="Password"
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              error={!!errors.password}
              helperText={errors.password}
            />
            <Button variant="contained" type="submit" disabled={isSubmitting}>
              Login
            </Button>
          </Stack>
        )}
      </Formik>
    </Container>
  );
};

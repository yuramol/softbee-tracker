import React from 'react';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import { Stack, Typography, TextField, Button } from '@mui/material';
import * as yup from 'yup';

import { LOGIN_MUTATION } from 'api';
import { useAuthUser, useNotification } from 'hooks';
import { MainWrapper } from 'components';
import { UsersPermissionsLoginPayload } from 'types/GraphqlTypes';
import { PageProps } from './types';

enum LoginFields {
  Identifier = 'identifier',
  Password = 'password',
}

const LoginPage: React.FC<PageProps> = ({ title }) => {
  const { login } = useAuthUser();
  const notification = useNotification();
  const [loginMutation, { loading }] = useMutation<{
    login: UsersPermissionsLoginPayload;
  }>(LOGIN_MUTATION);

  const initialValues = {
    [LoginFields.Identifier]: '',
    [LoginFields.Password]: '',
  };

  const validationSchema = yup.object({
    [LoginFields.Identifier]: yup
      .string()
      .email('Please enter a valid e-mail address')
      .required('Should not be empty'),
    [LoginFields.Password]: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Should not be empty'),
  });

  const {
    values,
    errors,
    touched,
    isSubmitting,
    setErrors,
    setSubmitting,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      loginMutation({ variables: { input: values } })
        .then(({ data }) => {
          if (data?.login.jwt) {
            login(data.login.jwt);
            notification({
              message: 'Congratulations, you have logged in to SoftBee Tracker',
              variant: 'success',
            });
          }
        })
        .catch((error) => {
          setErrors({
            [LoginFields.Identifier]: error?.message,
            [LoginFields.Password]: error?.message,
          });
          setSubmitting(false);
        });
    },
  });

  return (
    <MainWrapper>
      <Stack direction="row" alignItems="center" height={'100%'}>
        <Stack
          flexBasis="60%"
          height={'100%'}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: (t) => t.palette.grey[200],
          }}
        />
        <Stack
          component="form"
          flexGrow={1}
          spacing={4}
          paddingLeft={10}
          paddingRight={10}
          paddingY={20}
          onSubmit={handleSubmit}
        >
          <Typography variant="h4" component="h1" align="center">
            {title}
          </Typography>
          <TextField
            variant="outlined"
            label="Email"
            type="email"
            name={LoginFields.Identifier}
            value={values[LoginFields.Identifier]}
            onChange={handleChange}
            error={
              touched[LoginFields.Identifier] &&
              !!errors[LoginFields.Identifier]
            }
            helperText={
              touched[LoginFields.Identifier] && errors[LoginFields.Identifier]
            }
          />
          <TextField
            variant="outlined"
            label="Password"
            type={LoginFields.Password}
            name={LoginFields.Password}
            value={values[LoginFields.Password]}
            onChange={handleChange}
            error={
              touched[LoginFields.Password] && !!errors[LoginFields.Password]
            }
            helperText={
              touched[LoginFields.Password] && errors[LoginFields.Password]
            }
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
      </Stack>
    </MainWrapper>
  );
};

export default LoginPage;

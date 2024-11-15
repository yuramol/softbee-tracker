import React, { FC, useState } from 'react';

import * as yup from 'yup';
import { useFormik } from 'formik';
import { Button, Stack, TextField, Typography } from '@mui/material';

interface Props {
  toggleForgotPassword: () => void;
}

enum ForgotPasswordFields {
  Email = 'email',
}

export const ForgotPasswordForm: FC<Props> = ({ toggleForgotPassword }) => {
  const [isResetPassword, setIsResetPassword] = useState(false);

  const initialValues = {
    [ForgotPasswordFields.Email]: '',
  };

  const validationSchema = yup.object({
    [ForgotPasswordFields.Email]: yup
      .string()
      .email('Please enter a valid e-mail address')
      .required('Should not be empty'),
  });

  const { values, errors, touched, isSubmitting, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values) => {
        setIsResetPassword(true);
        console.log('DEBUG === test', test);
      },
    });

  return (
    <>
      {isResetPassword ? (
        <Stack
          flexGrow={1}
          spacing={4}
          paddingLeft={{ md: 10 }}
          paddingRight={{ md: 10 }}
          paddingY={20}
          maxWidth={500}
        >
          <Typography variant="h3" component="h1" align="center">
            Password Reset Successful!
          </Typography>
          <Typography variant="h4" align="center" className="!font-normal">
            Please confirm your email by clicking the link in the verification
            email we sent to you 💌
          </Typography>
        </Stack>
      ) : (
        <Stack
          component="form"
          flexGrow={1}
          spacing={4}
          paddingLeft={{ md: 10 }}
          paddingRight={{ md: 10 }}
          paddingY={20}
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-3">
            <Typography variant="h4" component="h1" align="center">
              Forgot password?
            </Typography>
            <Typography variant="body1" align="center">
              You can reset your password here
            </Typography>
          </div>
          <div className="flex flex-col gap-2">
            <TextField
              variant="outlined"
              label="Email"
              type="email"
              name={ForgotPasswordFields.Email}
              value={values[ForgotPasswordFields.Email]}
              onChange={handleChange}
              error={
                touched[ForgotPasswordFields.Email] &&
                !!errors[ForgotPasswordFields.Email]
              }
              helperText={
                touched[ForgotPasswordFields.Email] &&
                errors[ForgotPasswordFields.Email]
              }
            />
            <p
              className="hover:text-slate-700 cursor-pointer ml-auto"
              onClick={toggleForgotPassword}
            >
              Back to login
            </p>
          </div>
          <Button
            variant="contained"
            type="submit"
            size="large"
            disabled={isSubmitting}
          >
            Send
          </Button>
        </Stack>
      )}
    </>
  );
};

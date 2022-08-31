import React from 'react';
import { Button, TextField, Stack, Typography } from '@mui/material';
import { useFormik, FormikContext } from 'formik';
import * as yup from 'yup';
import { CalendarPickerFormik, Select } from 'legos';
import { formikPropsErrors } from 'helpers';
import { useMutation } from '@apollo/client';
import { CREATE_USER_MUTATION } from 'api';
import { CreateUserFields, UserProps } from './types';
import { useNotification } from 'hooks';
import { format } from 'date-fns';

const positions = [
  { value: 'developer', label: 'developer' },
  { value: 'designer', label: 'designer' },
  { value: 'cdo', label: 'cdo' },
  { value: 'cto', label: 'cto' },
];

export const NewUser: React.FC<UserProps> = ({ setIsCreateUser }) => {
  const [createUsersPermissionsUser] = useMutation(CREATE_USER_MUTATION);
  const showNotification = useNotification();
  const initialValues = {
    [CreateUserFields.FirstName]: '',
    [CreateUserFields.LastName]: '',
    [CreateUserFields.Email]: '',
    [CreateUserFields.DateEmployment]: new Date(),
    [CreateUserFields.Position]: '',
    [CreateUserFields.Phone]: '',
    [CreateUserFields.SalaryInfo]: '1',
    [CreateUserFields.Password]: '',
    [CreateUserFields.UserName]: '',
    [CreateUserFields.Сonfirmed]: true,
  };
  const validationSchema = yup.object({
    [CreateUserFields.FirstName]: yup.string().required('Should not be empty'),
    [CreateUserFields.LastName]: yup.string().required('Should not be empty'),
    [CreateUserFields.UserName]: yup.string().required('Should not be empty'),
    [CreateUserFields.Password]: yup.string().required('Should not be empty'),
    [CreateUserFields.Position]: yup.string().required('Should not be empty'),
    [CreateUserFields.Phone]: yup
      .string()
      .required('Should not be empty')
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(10, 'Phone must be at least 10 characters'),
    [CreateUserFields.Email]: yup
      .string()
      .email('Please enter a valid e-mail address')
      .required('Should not be empty'),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await createUsersPermissionsUser({
          variables: {
            data: {
              ...values,
              [CreateUserFields.DateEmployment]: format(
                values[CreateUserFields.DateEmployment],
                'yyyy-MM-dd'
              ),
            },
          },
        });
        showNotification({
          message: 'User created!',
          variant: 'success',
        });
        setIsCreateUser(false);
      } catch (error) {
        showNotification({ error });
      }
    },
  });

  const { handleChange, handleSubmit, values } = formik;

  return (
    <FormikContext.Provider value={formik}>
      <form onSubmit={handleSubmit}>
        <Stack>
          <Typography variant="h3" mb={3}>
            Add new user
          </Typography>
          <Stack direction="row" gap={3} mb={2}>
            <TextField
              fullWidth
              label="User name"
              name={CreateUserFields.UserName}
              value={values[CreateUserFields.UserName]}
              {...formikPropsErrors(CreateUserFields.UserName, formik)}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Password"
              name={CreateUserFields.Password}
              value={values[CreateUserFields.Password]}
              {...formikPropsErrors(CreateUserFields.Password, formik)}
              onChange={handleChange}
            />
          </Stack>
          <Stack direction="row" gap={3} mb={2}>
            <TextField
              fullWidth
              label="First name"
              name={CreateUserFields.FirstName}
              value={values[CreateUserFields.FirstName]}
              {...formikPropsErrors(CreateUserFields.FirstName, formik)}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Last name"
              name={CreateUserFields.LastName}
              value={values[CreateUserFields.LastName]}
              {...formikPropsErrors(CreateUserFields.LastName, formik)}
              onChange={handleChange}
            />
          </Stack>

          <Stack direction="row" gap={3} mb={2}>
            <TextField
              fullWidth
              label="Email"
              name={CreateUserFields.Email}
              value={values[CreateUserFields.Email]}
              {...formikPropsErrors(CreateUserFields.Email, formik)}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Phone"
              name={CreateUserFields.Phone}
              value={values[CreateUserFields.Phone]}
              {...formikPropsErrors(CreateUserFields.Phone, formik)}
              onChange={handleChange}
            />
          </Stack>
          <Stack direction="row" gap={3} mb={2}>
            <Select
              label="Position"
              items={positions}
              value={values[CreateUserFields.Position]}
              name={CreateUserFields.Position}
              {...formikPropsErrors(CreateUserFields.Position, formik)}
              variant="outlined"
              onChange={handleChange}
            />
            <CalendarPickerFormik
              label="Position"
              field={CreateUserFields.DateEmployment}
              disableFuture
              views={['day']}
            />
          </Stack>
          <Stack direction="row-reverse" gap={2} mt={1}>
            <Button variant="contained" type="submit">
              Save
            </Button>
            <Button variant="outlined" onClick={() => setIsCreateUser(false)}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </form>
    </FormikContext.Provider>
  );
};

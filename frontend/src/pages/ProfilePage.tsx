import React, { useState } from 'react';
import { useFormik } from 'formik';

import { Box, Grid, TextField, Typography, Button } from '@mui/material';
import {
  CalendarMonth,
  Email,
  Link,
  Person,
  Phone,
  Work,
  Money,
} from '@mui/icons-material';

import { useAuth } from 'AuthProvider';
import { useUsersPermissionsUser } from 'hooks';
import { MainWrapper, AvatarUpload, Loader } from 'components';
import { ModalSelect } from 'legos';
import { UPDATE_USERS_PERMISSIONS_USER_MUTATION } from './../api/graphql/mutation/updateUsersPermissionsUser';
import { useMutation } from '@apollo/client';
import { UPLOAD_FILE_MUTATION } from './../api/graphql/mutation/UploadFileInput';

type inintialValuesType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  linkedIn: string;
  dateEmployment: string;
  avatar: string;
  salaryInfo: string;
};

type values = {
  [key: string]: string;
};
const profileInfo = [
  {
    label: 'First name',
    fieldName: 'firstName',
    component: 'input',
    type: 'text',
  },
  {
    label: 'Last name',
    fieldName: 'lastName',
    component: 'input',
    type: 'text',
  },
  {
    label: 'Position',
    fieldName: 'position',
    component: 'select',
    items: [
      { label: 'developer' },
      { label: 'designer' },
      { label: 'cdo' },
      { label: 'cto' },
      { label: 'manager' },
    ],
    type: 'text',
  },
  {
    label: 'Email',
    fieldName: 'email',
    component: 'input',
    type: 'email',
  },
  {
    label: 'linkedIn',
    fieldName: 'linkedIn',
    component: 'input',
    type: 'text',
  },
  {
    label: 'Phone',
    fieldName: 'phone',
    component: 'input',
    type: 'text',
  },
  {
    label: 'Date Of Employment',
    fieldName: 'dateEmployment',
    component: 'input',
    type: 'text',
  },
  {
    label: 'Salary Info',
    fieldName: 'salaryInfo',
    component: 'input',
    type: 'text',
  },
];

const ProfilePage = () => {
  const { user } = useAuth();

  const [edit, setEdit] = useState(false);

  const { userPermission, loading } = useUsersPermissionsUser(user.id);
  const [updateUserMutation] = useMutation(
    UPDATE_USERS_PERMISSIONS_USER_MUTATION
  );
  const [UploadFileInput] = useMutation(UPLOAD_FILE_MUTATION);
  const initialValues: inintialValuesType = {
    firstName: userPermission?.firstName || '',
    lastName: userPermission?.lastName || '',
    email: userPermission?.email || '',
    phone: userPermission?.phone || '',
    position: userPermission?.position || '',
    linkedIn: userPermission?.linkedIn || '',
    dateEmployment: userPermission?.dateEmployment || '',
    avatar: userPermission?.avatar.data?.attributes?.url,
    salaryInfo: userPermission?.salaryInfo || '',
  };
  console.log(userPermission?.avatar.data?.attributes);
  const formik = useFormik<inintialValuesType>({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      try {
        updateUserMutation({
          variables: { id: user.id, data: { ...values } },
        });
      } catch (error) {
        console.log('invalid request', error);
      } finally {
        setEdit(false);
      }
    },
  });

  const iconRender = (fieldName: string) => {
    switch (fieldName) {
      case 'email':
        return <Email />;
      case 'linkedIn':
        return <Link />;
      case 'phone':
        return <Phone />;
      case 'dateEmployment':
        return <CalendarMonth />;
      case 'position':
        return <Work />;
      case 'lastName':
        return <Person />;
      case 'firstName':
        return <Person />;
      case 'salaryInfo':
        return <Money />;
      default:
        return '';
    }
  };

  return (
    <MainWrapper>
      {loading ? (
        <Loader />
      ) : (
        <Grid container spacing={3}>
          <Grid container item xs={12} justifyContent="space-between">
            <Box ml={3}>
              <Typography
                fontWeight={700}
                fontSize={32}
              >{`${userPermission?.firstName} ${userPermission?.lastName}`}</Typography>
            </Box>
            {edit ? (
              <Button variant="contained" onClick={formik.submitForm}>
                Save
              </Button>
            ) : (
              <Button variant="outlined" onClick={() => setEdit(true)}>
                Edit
              </Button>
            )}
          </Grid>
          <Grid container item xs={3} justifyContent="center">
            <AvatarUpload
              name={`${formik.values.firstName} ${formik.values.lastName}`}
              avatar={userPermission?.avatar.data?.attributes?.url}
            />
          </Grid>
          <Grid item xs={6}>
            {profileInfo.map(({ fieldName, component, items, label, type }) => {
              if (component === 'select') {
                return (
                  <Box
                    key={fieldName}
                    display="flex"
                    alignItems="center"
                    my={1}
                  >
                    {iconRender(fieldName)}

                    <Box width="100%" ml={1}>
                      {items?.length && (
                        <ModalSelect
                          variant="standard"
                          value={(formik.values as values)[fieldName]}
                          onChange={(value) =>
                            formik.setFieldValue(fieldName, value)
                          }
                          disabled={!edit}
                          items={items}
                          label={label}
                          disableUnderline={!edit}
                          IconComponent={() => null}
                        />
                      )}
                    </Box>
                  </Box>
                );
              }
              if (component === 'input') {
                return (
                  <Box
                    key={fieldName}
                    display="flex"
                    alignItems="center"
                    my={2}
                  >
                    {iconRender(fieldName)}
                    <Box ml={1} width="100%">
                      <TextField
                        InputProps={{
                          disableUnderline: !edit,
                        }}
                        variant="standard"
                        disabled={!edit}
                        fullWidth
                        value={(formik.values as values)[fieldName]}
                        label={label}
                        type={type}
                        onChange={(e) =>
                          formik.setFieldValue(fieldName, e.target.value)
                        }
                      />
                    </Box>
                  </Box>
                );
              }
            })}
          </Grid>
        </Grid>
      )}
    </MainWrapper>
  );
};

export default ProfilePage;

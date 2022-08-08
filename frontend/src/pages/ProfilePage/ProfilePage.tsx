import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import { Box, Grid, Typography, Button, Stack } from '@mui/material';

import { useAuth } from 'AuthProvider';
import { UPDATE_USERS_PERMISSIONS_USER_MUTATION, UPLOAD_MUTATION } from 'api';
import { Select, Input, Icon } from 'legos';
import { useUsersPermissionsUser } from 'hooks';
import { initialValuesType, valuesType } from './types';
import { profileInfo, validationSchema } from './helpers';
import { MainWrapper, AvatarUpload, Loader } from 'components';

const ProfilePage = () => {
  const { user } = useAuth();
  const { userPermission, loading } = useUsersPermissionsUser(user.id);

  const isManager = user.role.type === 'manager';

  const [edit, setEdit] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const [updateUserMutation] = useMutation(
    UPDATE_USERS_PERMISSIONS_USER_MUTATION
  );

  const [uploadMutation] = useMutation(UPLOAD_MUTATION);

  const initialValues: initialValuesType = {
    email: userPermission?.email ?? '',
    phone: userPermission?.phone || '',
    lastName: userPermission?.lastName || '',
    position: userPermission?.position || '',
    linkedIn: userPermission?.linkedIn || '',
    firstName: userPermission?.firstName || '',
    salaryInfo: userPermission?.salaryInfo || '',
    dateEmployment: userPermission?.dateEmployment || '',
    avatar: userPermission?.avatar.data?.attributes?.url,
  };

  const formik = useFormik<initialValuesType>({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      try {
        updateUserMutation({
          variables: { id: user.id, data: { ...values } },
        });
      } catch (error) {
        console.log('updateUserMutation request', error);
      } finally {
        setEdit(false);
      }
    },
  });

  const handleChangeAvatar = (e: any) => {
    const [file] = e.target.files;

    if (file) {
      uploadMutation({
        variables: {
          file,
        },
      })
        .then(({ data }) => {
          if (data?.upload?.data.id) {
            updateUserMutation({
              variables: {
                id: user.id,
                data: { avatar: data?.upload?.data.id },
              },
            });
          }
        })
        .catch((error) => console.log(error));
      setAvatar(file);
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
              <Stack direction="row" gap={1}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setEdit(false);
                    formik.resetForm();
                  }}
                >
                  cancel
                </Button>
                <Button variant="contained" onClick={formik.submitForm}>
                  Save
                </Button>
              </Stack>
            ) : (
              <Button variant="outlined" onClick={() => setEdit(true)}>
                Edit
              </Button>
            )}
          </Grid>
          <Grid container item xs={3} justifyContent="center">
            <AvatarUpload
              name={`${formik.values.firstName} ${formik.values.lastName}`}
              isLocalPath={!!avatar}
              avatar={avatar || userPermission?.avatar.data?.attributes?.url}
              onChange={handleChangeAvatar}
            />
          </Grid>
          <Grid item xs={6}>
            {profileInfo.map(
              ({ fieldName, component, items, label, type, icon }) => {
                if (
                  !isManager &&
                  (fieldName === 'dateEmployment' || fieldName === 'salaryInfo')
                ) {
                  return null;
                }
                if (!edit && fieldName === 'linkedIn') {
                  return (
                    <Box
                      key={fieldName}
                      display="flex"
                      alignItems="center"
                      height={48}
                    >
                      <Icon icon={icon} />

                      <Box ml={1}>
                        <a
                          style={{
                            color: 'black',
                          }}
                          href={formik.values.linkedIn}
                          target="blank"
                          rel="noreferrer"
                        >
                          <Typography color="black">LinkedIn</Typography>
                        </a>
                      </Box>
                    </Box>
                  );
                }
                if (component === 'select') {
                  return (
                    <Box
                      key={fieldName}
                      display="flex"
                      alignItems="center"
                      my={1}
                    >
                      <Icon icon={icon} />

                      <Box width="100%" ml={1}>
                        {items?.length && (
                          <Select
                            variant="standard"
                            value={(formik.values as valuesType)[fieldName]}
                            onChange={(value) =>
                              formik.setFieldValue(fieldName, value)
                            }
                            disabled={!edit}
                            items={items}
                            label={label}
                            disableUnderline={!edit}
                            IconComponent={() => null}
                            colorDisabledValue="black"
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
                      <Icon icon={icon} />
                      <Box ml={1} width="100%">
                        <Input
                          disableUnderline={!edit}
                          variant="standard"
                          disabled={!edit}
                          fullWidth
                          value={(formik.values as valuesType)[fieldName]}
                          label={label}
                          type={type}
                          onChange={(value) =>
                            formik.setFieldValue(fieldName, value)
                          }
                          helperText={(formik.errors as valuesType)[fieldName]}
                          error={
                            !!(
                              (formik.touched as valuesType)[fieldName] &&
                              (formik.errors as valuesType)[fieldName]
                            )
                          }
                        />
                      </Box>
                    </Box>
                  );
                }
              }
            )}
          </Grid>
        </Grid>
      )}
    </MainWrapper>
  );
};

export default ProfilePage;

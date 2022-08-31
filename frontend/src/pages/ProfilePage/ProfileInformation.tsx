import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import { useFormik } from 'formik';

import { MainWrapper, Loader, AvatarUpload } from 'components';
import { PageProps } from 'pages/types';
import { useAuthUser, useNotification, useUsersPermissionsUser } from 'hooks';
import { CalendarPickerFormik, Icon, Input, Select } from 'legos';
import { UPDATE_USERS_PERMISSIONS_USER_MUTATION } from 'api';
import { useMutation } from '@apollo/client';
import { profileInfo, validationSchema } from './helpers';
import { ProfileHeader } from './ProfileHeader';
import { InitialValuesType, valuesType } from './types';
import { useChangeAvatar } from './useChangeAvatar';

type ProfileInformationProps = {
  id: any;
  edit: boolean;
  setEdit?: any;
};

const ProfileInformation = ({ id, edit, setEdit }: ProfileInformationProps) => {
  const { userPermission } = useUsersPermissionsUser(id);
  const { user } = useAuthUser();

  const showNotification = useNotification();
  const handleChangeAvatar = useChangeAvatar();
  const [updateUserMutation] = useMutation(
    UPDATE_USERS_PERMISSIONS_USER_MUTATION
  );
  const isManager = user.role.type === 'manager';
  const initialValues: InitialValuesType = {
    email: userPermission?.email ?? '-',
    phone: userPermission?.phone ?? '-',
    lastName: userPermission?.lastName ?? '-',
    position: userPermission?.position ?? 'developer',
    linkedIn: userPermission?.linkedIn ?? '-',
    // upWork: userPermission?.upWork ?? '-',
    firstName: userPermission?.firstName ?? '-',
    salaryInfo: userPermission?.salaryInfo ?? '-',
    dateEmployment: userPermission?.dateEmployment ?? '22.02.2022',
    avatar: userPermission?.avatar.data?.attributes?.url,
  };
  console.log(userPermission?.avatar.data?.attributes?.url, 'avatars');
  const formik = useFormik<InitialValuesType>({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const {
          data: { updateUsersPermissionsUser },
        } = await updateUserMutation({
          variables: { id: user.id, data: { ...values } },
        });
        if (updateUsersPermissionsUser?.data?.id) {
          showNotification({
            message: 'Changes are saved!',
            variant: 'success',
          });
        }
      } catch (error) {
        showNotification({ error });
      } finally {
        setEdit(false);
      }
    },
  });
  const { values, resetForm, submitForm, setFieldValue, errors, touched } =
    formik;
  console.log(values.dateEmployment, 'values');
  return (
    <MainWrapper>
      {userPermission ? (
        <>
          <Grid container spacing={3}>
            <Grid container item xs={12} justifyContent="space-between">
              <ProfileHeader
                firstName={userPermission?.firstName}
                lastName={userPermission?.lastName}
                setEdit={setEdit}
                edit={edit}
                resetForm={resetForm}
                submitForm={submitForm}
              />
            </Grid>
            <Grid container item xs={3} justifyContent="center">
              <AvatarUpload
                firstName={values.firstName}
                lastName={values.lastName}
                avatar={userPermission?.avatar.data?.attributes?.url}
                onChange={(event) =>
                  handleChangeAvatar({
                    event,
                    userId: user.id,
                    avatarId: userPermission?.avatar.data?.id,
                    updateUserMutation,
                  })
                }
              />
            </Grid>

            <Grid item xs={6}>
              {profileInfo.map(
                ({ fieldName, component, items, label, type, icon }) => {
                  if (
                    !isManager &&
                    (fieldName === 'dateEmployment' ||
                      fieldName === 'salaryInfo')
                  ) {
                    return null;
                  }

                  return (
                    <Box
                      key={fieldName}
                      display="flex"
                      alignItems="flex-end"
                      my={2}
                    >
                      <Box p={'5px'} display="flex" alignItems="center">
                        <Icon icon={icon} />
                      </Box>
                      {(!edit &&
                        (fieldName === 'upWork' ||
                          fieldName === 'linkedIn') && (
                          <Box ml={1}>
                            <a
                              style={{
                                color: 'black',
                              }}
                              href={
                                fieldName === 'upWork'
                                  ? values.linkedIn
                                  : values.linkedIn
                              }
                              target="blank"
                              rel="noreferrer"
                            >
                              {fieldName === 'upWork' ? (
                                <Typography color="black">upWork</Typography>
                              ) : (
                                <Typography color="black">linkedIn</Typography>
                              )}
                            </a>
                          </Box>
                        )) ||
                        (component === 'input' && (
                          <Box ml={1} width="100%">
                            <Input
                              placeholder={label}
                              variant="standard"
                              fullWidth
                              value={(values as valuesType)[fieldName]}
                              label={label}
                              type={type}
                              onChange={(value) =>
                                setFieldValue(fieldName, value)
                              }
                              InputProps={{
                                readOnly: !edit,
                                disableUnderline: !edit,
                              }}
                              helperText={(errors as valuesType)[fieldName]}
                              error={
                                !!(
                                  (touched as valuesType)[fieldName] &&
                                  (errors as valuesType)[fieldName]
                                )
                              }
                            />
                          </Box>
                        )) ||
                        (component === 'select' && (
                          <Box width="100%" ml={1}>
                            {items?.length && (
                              <Select
                                value={(values as valuesType)[fieldName]}
                                disabled={!edit}
                                items={items}
                                name={fieldName}
                                label={label}
                                disableUnderline={!edit}
                                IconComponent={() => null}
                                readOnly={!edit}
                                onChange={formik.handleChange}
                              />
                            )}
                          </Box>
                        )) ||
                        (component === 'timepicker' && edit && (
                          <Box ml={1} width="100%">
                            <CalendarPickerFormik field="dateEmployment" />
                          </Box>
                        ))}
                    </Box>
                  );
                }
              )}
            </Grid>
          </Grid>
        </>
      ) : (
        <Loader />
      )}
    </MainWrapper>
  );
};

export default ProfileInformation;

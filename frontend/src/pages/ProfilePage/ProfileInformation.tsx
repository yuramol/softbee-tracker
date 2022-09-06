import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { FormikContext, useFormik } from 'formik';

import { MainWrapper, Loader, AvatarUpload } from 'components';
import { useAuthUser, useNotification, useUsersPermissionsUser } from 'hooks';
import { CalendarPickerFormik, Icon, Input, Select } from 'legos';
import { UPDATE_USERS_PERMISSIONS_USER_MUTATION } from 'api';
import { useMutation } from '@apollo/client';
import { profileInfo, validationSchema } from './helpers';
import { ProfileHeader } from './ProfileHeader';
import { InitialValuesType, valuesType } from './types';
import { useChangeAvatar } from './useChangeAvatar';
import { useLocation } from 'react-router-dom';
import { formatUserFullName } from 'helpers';
import format from 'date-fns/format';

type ProfileInformationProps = {
  id: any;
  isCanEdit: boolean;
};

const ProfileInformation = ({ id, isCanEdit }: ProfileInformationProps) => {
  const { userPermission } = useUsersPermissionsUser(id);
  const { user } = useAuthUser();
  const [edit, setEdit] = useState(false);
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
    linkedIn: userPermission?.linkedIn ?? '',
    // upWork: userPermission?.upWork ?? '-',
    firstName: userPermission?.firstName ?? '-',
    salaryInfo: userPermission?.salaryInfo ?? '-',
    dateEmployment: userPermission?.dateEmployment,
    avatar: userPermission?.avatar.data?.attributes?.url,
  };
  const formik = useFormik<InitialValuesType>({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const {
          data: { updateUsersPermissionsUser },
        } = await updateUserMutation({
          variables: {
            id: id,
            data: {
              ...values,
            },
          },
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
  // console.log(values, 'values');
  const { values, resetForm, submitForm, setFieldValue, errors, touched } =
    formik;
  const location = useLocation();
  console.log(location.pathname);
  return (
    <MainWrapper>
      {userPermission ? (
        <FormikContext.Provider value={formik}>
          <Grid container spacing={3}>
            <Grid container item xs={12} justifyContent="space-between">
              {!isCanEdit ? (
                <Box ml={3}>
                  {id}
                  <Typography fontWeight={700} fontSize={32}>
                    {formatUserFullName(
                      userPermission?.firstName,
                      userPermission?.lastName
                    )}
                  </Typography>
                </Box>
              ) : (
                <ProfileHeader
                  firstName={userPermission?.firstName}
                  lastName={userPermission?.lastName}
                  setEdit={setEdit}
                  edit={edit}
                  resetForm={resetForm}
                  submitForm={submitForm}
                  isCanEdit={isCanEdit}
                />
              )}
            </Grid>
            <Grid container item xs={3} justifyContent="center">
              <AvatarUpload
                firstName={values.firstName}
                lastName={values.lastName}
                avatar={userPermission?.avatar.data?.attributes?.url}
                onChange={(event) =>
                  handleChangeAvatar({
                    event,
                    userId: id,
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
                            {values.linkedIn !== '' && (
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
                                  <Typography color="black">
                                    linkedIn
                                  </Typography>
                                )}
                              </a>
                            )}
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
                        (component === 'timepicker' && (
                          <Box ml={1} width="100%">
                            {edit ? (
                              <CalendarPickerFormik
                                field={fieldName}
                                variant="standard"
                              />
                            ) : (
                              <Typography>
                                {(values as valuesType)[fieldName]}
                              </Typography>
                            )}
                          </Box>
                        ))}
                    </Box>
                  );
                }
              )}
            </Grid>
          </Grid>
        </FormikContext.Provider>
      ) : (
        <Loader />
      )}
    </MainWrapper>
  );
};

export default ProfileInformation;

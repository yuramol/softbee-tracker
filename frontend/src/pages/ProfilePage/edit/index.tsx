import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import { useFormik } from 'formik';

import { MainWrapper, Loader } from 'components';
import { PageProps } from 'pages/types';
import { useAuthUser, useNotification, useUsersPermissionsUser } from 'hooks';
import { Avatar, CalendarPickerFormik, Icon, Input, Select } from 'legos';
import { profileInfo, validationSchema } from '../helpers';
import { InitialValuesType, valuesType } from '../types';
import { UPDATE_USERS_PERMISSIONS_USER_MUTATION } from 'api';
import { useMutation } from '@apollo/client';
import { useChangeAvatar } from '../useChangeAvatar';
import { ProfileHeader } from '../ProfileHeader';

const ProfileEditPage: React.FC<PageProps> = ({ title }) => {
  const { userId } = useParams();
  const { userPermission } = useUsersPermissionsUser(`${userId}`);
  const { user } = useAuthUser();
  const showNotification = useNotification();
  const handleChangeAvatar = useChangeAvatar();
  const [updateUserMutation] = useMutation(
    UPDATE_USERS_PERMISSIONS_USER_MUTATION
  );
  const isManager = user.role.type === 'manager';
  const [edit, setEdit] = useState(true);
  const initialValues: InitialValuesType = {
    email: userPermission?.email ?? '-',
    phone: userPermission?.phone ?? '-',
    lastName: userPermission?.lastName ?? '-',
    position: userPermission?.position ?? 'developer',
    linkedIn: userPermission?.linkedIn ?? '-',
    // upWork: userPermission?.upWork ?? '-',
    firstName: userPermission?.firstName ?? '-',
    salaryInfo: userPermission?.salaryInfo ?? '-',
    dateEmployment: userPermission?.dateEmployment ?? '-',
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
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  return (
    <MainWrapper>
      {userPermission ? (
        <>
          <ProfileHeader
            firstName={userPermission?.firstName}
            lastName={userPermission?.lastName}
            setEdit={setEdit}
            edit={edit}
            resetForm={resetForm}
            submitForm={submitForm}
          />
          <Grid item xs={6}>
            {profileInfo.map(
              ({ fieldName, component, items, label, type, icon }) => {
                if (
                  !isManager &&
                  (fieldName === 'dateEmployment' || fieldName === 'salaryInfo')
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
                      (fieldName === 'upWork' || fieldName === 'linkedIn') && (
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
                              // onChange={(value) =>
                              //   setFieldValue(fieldName, value)
                              // }
                              onChange={formik.handleChange}
                            />
                          )}
                        </Box>
                      )) ||
                      (fieldName === 'salaryInfo' && (
                        <Box width="100%" ml={1}>
                          <CalendarPickerFormik
                            field={(values as valuesType)[fieldName]}
                            disableFuture
                            views={['day']}
                          />
                        </Box>
                      ))}
                  </Box>
                );
              }
            )}
          </Grid>
        </>
      ) : (
        <Loader />
      )}
    </MainWrapper>
  );
};

export default ProfileEditPage;

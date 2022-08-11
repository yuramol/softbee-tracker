import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import { Box, Grid, Typography } from '@mui/material';

import { useAuth } from 'AuthProvider';
import {
  UPDATE_USERS_PERMISSIONS_USER_MUTATION,
  UPLOAD_MUTATION,
  REMOVE_FILE_MUTATION,
} from 'api';
import { Select, Input, Icon } from 'legos';
import { useUsersPermissionsUser } from 'hooks';
import { InitialValuesType, valuesType } from './types';
import { profileInfo, validationSchema } from './helpers';
import { MainWrapper, AvatarUpload, Loader } from 'components';
import { ProfileHeader } from './ProfileHeader';
import { changeAvatar } from './changeAvatar';

const ProfilePage = () => {
  const { user } = useAuth();
  const { userPermission, loading } = useUsersPermissionsUser(user.id);

  const isManager = user.role.type === 'manager';

  const [edit, setEdit] = useState(false);

  const [updateUserMutation] = useMutation(
    UPDATE_USERS_PERMISSIONS_USER_MUTATION
  );
  const [uploadMutation] = useMutation(UPLOAD_MUTATION);
  const [removeFileMutation] = useMutation(REMOVE_FILE_MUTATION);

  const initialValues: InitialValuesType = {
    email: userPermission?.email ?? '',
    phone: userPermission?.phone ?? '',
    lastName: userPermission?.lastName ?? '',
    position: userPermission?.position ?? '',
    linkedIn: userPermission?.linkedIn ?? '',
    firstName: userPermission?.firstName ?? '',
    salaryInfo: userPermission?.salaryInfo ?? '',
    dateEmployment: userPermission?.dateEmployment ?? '',
    avatar: userPermission?.avatar.data?.attributes?.url,
  };

  const formik = useFormik<InitialValuesType>({
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

  const { values, resetForm, submitForm, setFieldValue, errors, touched } =
    formik;

  return (
    <MainWrapper>
      {loading ? (
        <Loader />
      ) : (
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
              name={`${values.firstName} ${values.lastName}`}
              avatar={userPermission?.avatar.data?.attributes?.url}
              onChange={(event) =>
                changeAvatar({
                  event,
                  userId: user.id,
                  avatarId: userPermission?.avatar.data?.id,
                  uploadMutation,
                  removeFileMutation,
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
                          href={values.linkedIn}
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
                            value={(values as valuesType)[fieldName]}
                            disabled={!edit}
                            items={items}
                            label={label}
                            disableUnderline={!edit}
                            IconComponent={() => null}
                            readOnly={!edit}
                            onChange={(value) =>
                              setFieldValue(fieldName, value)
                            }
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
                          fullWidth
                          value={(values as valuesType)[fieldName]}
                          label={label}
                          type={type}
                          onChange={(value) => setFieldValue(fieldName, value)}
                          InputProps={{
                            readOnly: !edit,
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

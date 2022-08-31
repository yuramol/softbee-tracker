import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import { Box, Grid, Typography } from '@mui/material';

import { UPDATE_USERS_PERMISSIONS_USER_MUTATION } from 'api';
import { Select, Input, Icon } from 'legos';
import { useAuthUser, useUsersPermissionsUser } from 'hooks';
import { InitialValuesType, valuesType } from './types';
import { profileInfo, validationSchema } from './helpers';
import {
  MainWrapper,
  AvatarUpload,
  Loader,
  TrackerCalendar,
  TimeInspector,
} from 'components';
import { ProfileHeader } from './ProfileHeader';
import { useChangeAvatar } from './useChangeAvatar';
import { useNotification } from 'hooks/useNotification';
import ProfileInformation from './ProfileInformation';

const ProfilePage = () => {
  const { user } = useAuthUser();
  const { userPermission, loading } = useUsersPermissionsUser(user.id);

  const [edit, setEdit] = useState(false);

  const [selectedDay, setSelectedDay] = useState<Date>(new Date());

  return (
    <MainWrapper
      sidebar={
        <>
          <TimeInspector />
          <TrackerCalendar
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />
        </>
      }
    >
      {loading ? (
        <Loader />
      ) : (
        <Grid container spacing={3}>
          <ProfileInformation id={user.id} edit={edit} setEdit={setEdit} />
        </Grid>
      )}
    </MainWrapper>
  );
};

export default ProfilePage;

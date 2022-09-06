import React, { useState } from 'react';
import { Grid } from '@mui/material';

import { useAuthUser, useUsersPermissionsUser } from 'hooks';
import {
  MainWrapper,
  Loader,
  TrackerCalendar,
  TimeInspector,
} from 'components';
import ProfileInformation from './ProfileInformation';

const ProfilePage = () => {
  const { user } = useAuthUser();
  const { loading } = useUsersPermissionsUser(user.id);


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
          <ProfileInformation id={user.id} isCanEdit={true} />
        </Grid>
      )}
    </MainWrapper>
  );
};

export default ProfilePage;

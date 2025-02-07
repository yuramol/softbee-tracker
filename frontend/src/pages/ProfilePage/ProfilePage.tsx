import React, { useState } from 'react';
import { Close } from '@mui/icons-material';
import { Drawer, IconButton, Stack } from '@mui/material';

import {
  MainWrapper,
  TrackerCalendar,
  TimeInspector,
  VacationWidget,
} from 'components';
import { Button } from 'legos';
import { useAuthUser } from 'hooks';
import { ProfileEditView } from './ProfileEditView';

const ProfilePage = () => {
  const { user } = useAuthUser();
  const [openDrawer, setOpenDrawer] = useState(false);

  const [selectedDay, setSelectedDay] = useState<Date>(new Date());

  const toggleDrawer = () => setOpenDrawer(!openDrawer);

  return (
    <MainWrapper
      sidebar={
        <>
          <VacationWidget />
          <TimeInspector userId={user.id} />
          <TrackerCalendar
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />
        </>
      }
    >
      <Button
        sx={{ mb: 2, display: { lg: 'none' } }}
        variant="contained"
        title="Open sidebar"
        size="large"
        onClick={toggleDrawer}
      />
      <ProfileEditView id={user.id} />

      <Drawer
        open={openDrawer}
        onClose={toggleDrawer}
        sx={{
          m: 4,
          '& .MuiPaper-root': {
            width: '100%',
            maxWidth: 'fit-content',
          },
        }}
      >
        <Stack position="relative" flexDirection="column" p={4} pt={8}>
          <IconButton
            onClick={toggleDrawer}
            sx={{ position: 'absolute', top: 5, right: 5 }}
          >
            <Close />
          </IconButton>
          <VacationWidget />
          <TimeInspector userId={user.id} />
          <TrackerCalendar
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />
        </Stack>
      </Drawer>
    </MainWrapper>
  );
};

export default ProfilePage;

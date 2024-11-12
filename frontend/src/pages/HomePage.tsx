import React, { useEffect, useState } from 'react';
import { Close } from '@mui/icons-material';
import { Drawer, IconButton, Stack, Typography } from '@mui/material';
import { addDays, endOfMonth, format, startOfMonth, subMonths } from 'date-fns';

import {
  MainWrapper,
  TimeInspector,
  TrackerCalendar,
  TrackerDayView,
  VacationWidget,
} from '../components';
import { Button } from 'legos';
import { PageProps } from './types';
import { useAuthUser, useNormalizedTrackers } from 'hooks';

const HomePage: React.FC<PageProps> = ({ title }) => {
  const { user } = useAuthUser();
  const [openDrawer, setOpenDrawer] = useState(false);

  const [selectedDay, setSelectedDay] = useState(new Date());

  const [startMonth, setStartMonth] = useState(
    format(subMonths(startOfMonth(new Date()), 1), 'YYY-MM-dd')
  );
  const [endMonth, setEndMonth] = useState(
    format(addDays(endOfMonth(new Date()), 7), 'YYY-MM-dd')
  );

  const filters = {
    user: { id: { in: [user.id] } },
    date: { between: [startMonth, endMonth] },
  };

  const { fetchTrackers, normalizedTrackers } = useNormalizedTrackers(
    filters,
    false
  );

  useEffect(() => {
    fetchTrackers({
      variables: { filters },
    });
  }, [user.id]);

  const toggleDrawer = () => setOpenDrawer(!openDrawer);

  return user.id ? (
    <MainWrapper
      sidebar={
        <>
          <VacationWidget />
          <TimeInspector userId={user.id} />
          <TrackerCalendar
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            trackers={normalizedTrackers}
            setStartMonth={setStartMonth}
            setEndMonth={setEndMonth}
          />
        </>
      }
    >
      <Typography variant="h1">{title}</Typography>
      <Button
        sx={{ my: 2 }}
        variant="contained"
        title="Open sidebar"
        size="large"
        onClick={toggleDrawer}
      />
      <Drawer open={openDrawer} onClose={toggleDrawer} sx={{ m: 4 }}>
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
            trackers={normalizedTrackers}
            setStartMonth={setStartMonth}
            setEndMonth={setEndMonth}
          />
        </Stack>
      </Drawer>
      <TrackerDayView selectedDay={selectedDay} trackers={normalizedTrackers} />
    </MainWrapper>
  ) : null;
};

export default HomePage;

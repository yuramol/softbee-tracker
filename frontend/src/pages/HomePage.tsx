import React, { useState } from 'react';
import { Typography } from '@mui/material';

import {
  MainWrapper,
  TimeInspector,
  TrackerCalendar,
  TrackerDayView,
} from '../components';
import { useAuth } from 'AuthProvider';
import { useNormalizedTrackers } from 'hooks';
import { endOfMonth, format, startOfMonth } from 'date-fns';

const HomePage = () => {
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());

  const [startMonth, setStartMonth] = useState(
    format(startOfMonth(new Date()), 'YYY-MM-dd')
  );
  const [endMonth, setEndMonth] = useState(
    format(endOfMonth(new Date()), 'YYY-MM-dd')
  );
  const { user } = useAuth();
  const { trackers } = useNormalizedTrackers(user.id, startMonth, endMonth);

  return (
    <MainWrapper
      sidebar={
        <>
          <TimeInspector />
          <TrackerCalendar
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            trackers={trackers}
            setStartMonth={setStartMonth}
            setEndMonth={setEndMonth}
          />
        </>
      }
    >
      <Typography variant="h1">Tracker</Typography>
      <TrackerDayView selectedDay={selectedDay} />
    </MainWrapper>
  );
};

export default HomePage;

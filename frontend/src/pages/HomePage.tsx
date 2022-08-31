import React, { useState } from 'react';
import { Typography } from '@mui/material';

import {
  MainWrapper,
  TimeInspector,
  TrackerCalendar,
  TrackerDayView,
} from '../components';
import { useAuthUser, useNormalizedTrackers } from 'hooks';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { PageProps } from './types';

const HomePage = () => {
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());

  const [startMonth, setStartMonth] = useState(
    format(startOfMonth(new Date()), 'YYY-MM-dd')
  );
  const [endMonth, setEndMonth] = useState(
    format(endOfMonth(new Date()), 'YYY-MM-dd')
  );
  const { user } = useAuthUser();
  const { trackers, refetch } = useNormalizedTrackers(
    user.id,
    startMonth,
    endMonth
  );

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
      <TrackerDayView
        selectedDay={selectedDay}
        trackers={trackers}
        refetchTrackers={refetch}
      />
    </MainWrapper>
  );
};

export default HomePage;

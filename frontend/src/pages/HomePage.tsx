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

const HomePage: React.FC<PageProps> = ({ title }) => {
  const { user } = useAuthUser();
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());

  const [startMonth, setStartMonth] = useState(
    format(startOfMonth(new Date()), 'YYY-MM-dd')
  );
  const [endMonth, setEndMonth] = useState(
    format(endOfMonth(new Date()), 'YYY-MM-dd')
  );

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
      <Typography variant="h1">{title}</Typography>
      <TrackerDayView selectedDay={selectedDay} />
    </MainWrapper>
  );
};

export default HomePage;

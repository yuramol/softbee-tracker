import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

import {
  MainWrapper,
  TimeInspector,
  TrackerCalendar,
  TrackerDayView,
  VacationWidget,
} from '../components';
import { useAuthUser, useNormalizedTrackers } from 'hooks';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { PageProps } from './types';

const HomePage: React.FC<PageProps> = ({ title }) => {
  const { user } = useAuthUser();
  const [selectedDay, setSelectedDay] = useState(new Date());

  const [startMonth, setStartMonth] = useState(
    format(startOfMonth(new Date()), 'YYY-MM-dd')
  );
  const [endMonth, setEndMonth] = useState(
    format(endOfMonth(new Date()), 'YYY-MM-dd')
  );

  const filters = {
    user: { id: { in: [user.id] } },
    date: { between: [startMonth, endMonth] },
    or: [
      { status: { eq: null } },
      { status: { eq: 'rejected' } },
      { status: { eq: 'approved' } },
    ],
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
      <TrackerDayView selectedDay={selectedDay} trackers={normalizedTrackers} />
    </MainWrapper>
  ) : null;
};

export default HomePage;

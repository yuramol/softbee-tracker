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
import { addDays, endOfMonth, format, startOfMonth, subDays } from 'date-fns';
import { PageProps } from './types';

const HomePage: React.FC<PageProps> = ({ title }) => {
  const { user } = useAuthUser();
  const [selectedDay, setSelectedDay] = useState(new Date());

  const [startMonth, setStartMonth] = useState(
    format(subDays(startOfMonth(new Date()), 7), 'YYY-MM-dd')
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

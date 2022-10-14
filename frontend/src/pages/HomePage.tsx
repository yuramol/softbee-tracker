import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

import {
  MainWrapper,
  TimeInspector,
  TrackerCalendar,
  TrackerDayView,
  VacationWidget,
} from '../components';
import { useAuthUser, useNormalizedTrackers, usePageTitle } from 'hooks';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { PageProps } from './types';

const HomePage: React.FC<PageProps> = ({ title }) => {
  const { setTitle } = usePageTitle();

  const { user } = useAuthUser();
  const [selectedDay, setSelectedDay] = useState(new Date());

  const [startMonth, setStartMonth] = useState(
    format(startOfMonth(new Date()), 'YYY-MM-dd')
  );
  const [endMonth, setEndMonth] = useState(
    format(endOfMonth(new Date()), 'YYY-MM-dd')
  );
  useEffect(() => {
    setTitle(title as string);
  }, []);
  const { normalizedTrackers, refetch } = useNormalizedTrackers({
    user: { id: { in: [user.id] } },
    date: { between: [startMonth, endMonth] },
  });

  return (
    <MainWrapper
      sidebar={
        <>
          <VacationWidget />
          <TimeInspector />
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
      <TrackerDayView
        selectedDay={selectedDay}
        trackers={normalizedTrackers}
        refetchTrackers={refetch}
      />
    </MainWrapper>
  );
};

export default HomePage;

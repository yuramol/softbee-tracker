import React, { useState } from 'react';
import { Typography } from '@mui/material';

import {
  MainWrapper,
  TimeInspector,
  TrackerCalendar,
  TrackerDayView,
} from '../components';

const HomePage = () => {
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
      <Typography variant="h1">Tracker</Typography>
      <TrackerDayView selectedDay={selectedDay} />
    </MainWrapper>
  );
};

export default HomePage;

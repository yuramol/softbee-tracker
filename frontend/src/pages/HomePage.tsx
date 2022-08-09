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

  const setDateHandler = (date: Date) => {
    setSelectedDay(date);
  };

  return (
    <MainWrapper
      sidebar={
        <>
          <TimeInspector />
          <TrackerCalendar
            selectedDay={selectedDay}
            setDateHandler={setDateHandler}
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

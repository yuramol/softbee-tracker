import React, { useState } from 'react';
import { Typography } from '@mui/material';

import {
  MainWrapper,
  TimeInspector,
  TrackerCalendar,
  TrackerDayView,
} from '../components';

const HomePage = () => {
  const [currentDate, setDate] = useState<Date>(new Date());

  const setDateHandler = (date: Date) => {
    setDate(date);
  };

  return (
    <MainWrapper
      sidebar={
        <>
          <TimeInspector />
          <TrackerCalendar date={currentDate} setDateHandler={setDateHandler} />
        </>
      }
    >
      <Typography variant="h1">Tracker</Typography>
      <TrackerDayView date={currentDate} />
    </MainWrapper>
  );
};

export default HomePage;

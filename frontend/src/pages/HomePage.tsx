import React from 'react';
import { Typography } from '@mui/material';

import {
  MainWrapper,
  TimeInspector,
  TrackerCalendar,
  TrackerDayView,
} from '../components';

const HomePage = () => {
  return (
    <MainWrapper
      sidebar={
        <>
          <TimeInspector />
          <TrackerCalendar />
        </>
      }
    >
      <Typography variant="h1">Tracker</Typography>
      <TrackerDayView />
    </MainWrapper>
  );
};

export default HomePage;

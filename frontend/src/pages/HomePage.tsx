import React from 'react';
import { Typography } from '@mui/material';

import { MainWrapper, TrackerCalendar, TrackerDayView } from '../components';

const HomePage = () => {
  return (
    <MainWrapper sidebar={<TrackerCalendar />}>
      <Typography variant="h1">Tracker</Typography>
      <TrackerDayView />
    </MainWrapper>
  );
};

export default HomePage;

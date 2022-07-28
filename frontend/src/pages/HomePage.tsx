import React from 'react';

import { Typography } from '@mui/material';
import { MainWrapper, TrackerDayView } from '../components';

const HomePage = () => {
  return (
    <MainWrapper sidebar={<p>Width right sidebar</p>}>
      <Typography variant="h1">Tracker</Typography>
      <TrackerDayView />
    </MainWrapper>
  );
};

export default HomePage;

import React from 'react';
import { Typography } from '@mui/material';

import { MainWrapper, TrackerCalendar, TrackerDayView } from '../components';
import { TimeSection } from 'components/TimeInspector/TimeSection';

const HomePage = () => {
  return (
    <MainWrapper
      sidebar={
        <>
          <TimeSection />
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

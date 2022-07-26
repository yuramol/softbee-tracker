import React from 'react';

import { MainWrapper, TrackerDayView, TrackerAddNewEntry } from '../components';

const HomePage = () => {
  return (
    <MainWrapper sidebar={<p>Width right sidebar</p>}>
      <h1>Tracker</h1>
      <TrackerDayView />
      <TrackerAddNewEntry />
    </MainWrapper>
  );
};

export default HomePage;

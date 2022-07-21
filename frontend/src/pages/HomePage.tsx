import React from 'react';
import { MainWrapper } from '../components';

const HomePage = () => {
  return (
    <MainWrapper sidebar={<p>Width right sidebar</p>}>
      <h1>Tracker</h1>
    </MainWrapper>
  );
};

export default HomePage;

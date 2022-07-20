import React from 'react';
import { MainWrapper } from '../components/MainWrapper/MainWrapper';

export const HomePage = () => {
  return (
    <MainWrapper sidebar={<p>Sidebar</p>}>
      <h1>Home Page</h1>
    </MainWrapper>
  );
};

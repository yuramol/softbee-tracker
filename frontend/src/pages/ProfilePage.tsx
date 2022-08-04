import React from 'react';
import {
  MainWrapper,
  ProjectLayout,
  SummaryProject,
  TeamProject,
} from '../components';

const ProfilePage = () => {
  return (
    <MainWrapper>
      <h1>Profile</h1>
      <p>Full width container</p>
      <ProjectLayout />
      <TeamProject />
      <SummaryProject />
    </MainWrapper>
  );
};

export default ProfilePage;

import React from 'react';
import { useParams } from 'react-router-dom';
import { MainWrapper, VerticalTabsContainer } from 'components';

const ProfileViewPage = () => {
  const { projectId } = useParams();

  return (
    <MainWrapper>
      <VerticalTabsContainer id={`${projectId}`} />
    </MainWrapper>
  );
};

export default ProfileViewPage;

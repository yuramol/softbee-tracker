import React from 'react';
import { useParams } from 'react-router-dom';
import { MainWrapper, ProjectTabs } from 'components';

const ProfileViewPage = () => {
  const { projectId } = useParams();

  return (
    <MainWrapper>
      <ProjectTabs id={`${projectId}`} />
    </MainWrapper>
  );
};

export default ProfileViewPage;

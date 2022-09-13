import React from 'react';
import { useParams } from 'react-router-dom';
import { MainWrapper } from 'components';
import { ProjectView } from '../ProjectView';

const ProfileViewPage = () => {
  const { projectId } = useParams();

  return (
    <MainWrapper>
      <ProjectView id={`${projectId}`} />
    </MainWrapper>
  );
};

export default ProfileViewPage;

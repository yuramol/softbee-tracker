import React from 'react';
import { AddNewProject, MainWrapper } from '../components';

const ProjectPage = () => {
  return (
    <MainWrapper sidebar={<p>Width left sidebar</p>}>
      <AddNewProject />
    </MainWrapper>
  );
};

export default ProjectPage;

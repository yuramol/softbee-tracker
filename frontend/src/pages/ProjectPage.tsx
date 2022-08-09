import { ProjectList } from 'components/ProjectList/ProjectList';
import React from 'react';
import { Typography } from '@mui/material';
import { MainWrapper } from '../components';

const ProjectPage = () => {
  return (
    <MainWrapper sidebar={<p>Width left sidebar</p>}>
      <Typography variant="h1">Project</Typography>
      <ProjectList />
    </MainWrapper>
  );
};

export default ProjectPage;

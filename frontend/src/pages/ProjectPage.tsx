import React from 'react';
import { Typography } from '@mui/material';
import { MainWrapper, AddNewProject } from '../components';

const ProjectPage = () => {
  return (
    <MainWrapper sidebar={<p>Width left sidebar</p>}>
      <Typography variant="h1">Project</Typography>
      <AddNewProject />
    </MainWrapper>
  );
};

export default ProjectPage;

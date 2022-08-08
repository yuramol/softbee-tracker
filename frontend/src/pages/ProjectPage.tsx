import React from 'react';
import { Typography } from '@mui/material';
import {
  MainWrapper,
  NewProjectStep,
  SummaryStep,
  TeamStep,
} from '../components';

const ProjectPage = () => {
  return (
    <MainWrapper sidebar={<p>Width left sidebar</p>}>
      <Typography variant="h1">Project</Typography>
      <NewProjectStep />
      <TeamStep />
      <SummaryStep />
    </MainWrapper>
  );
};

export default ProjectPage;

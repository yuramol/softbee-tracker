import { ProjectList } from 'components/ProjectList/ProjectList';
import React from 'react';
import { Stack, Typography } from '@mui/material';
import { AddNewProject, MainWrapper } from '../../components';

import { ProjectFilters } from './ProjectFilters';
import { Button } from 'legos';
import { SideBars } from 'components/SideBars';

const ProjectPage = () => {
  //TODO add projects info and info about PR
  const projects = [
    {
      id: 1,
      projectName: 'UpWork',
      timeLine: '20.11.21-12.12.23',
      projectManager: 'Oleksandr Zastavnyi',
      type: 'fixedPrice',
    },
    {
      id: 3,
      projectName: 'Plumbid',
      timeLine: '20.11.21-12.12.23',
      projectManager: 'Yura Moldavchuk',
      type: 'fixedPrice',
    },
    {
      id: 4,
      projectName: 'PalPal',
      timeLine: '20.11.21-12.12.23',
      projectManager: 'Andrev Antonuch',
      type: 'timeMaterial',
      projectManagerAvatar: 'https://i.pravatar.cc/300',
    },
  ];

  return (
    <MainWrapper
      sidebar={
        <>
          <Button
            sx={{ mb: 2 }}
            fullWidth
            variant="contained"
            title="Add new project"
            size="large"
          />
          <SideBars />
        </>
      }
    >
      <Typography variant="h1">Project</Typography>
      <Stack mt={4} spacing={2}>
        <Stack direction="row" spacing={2} mb={4}>
          <ProjectFilters />
        </Stack>
        <ProjectList projectList={projects} />
        <AddNewProject />
      </Stack>
    </MainWrapper>
  );
};

export default ProjectPage;

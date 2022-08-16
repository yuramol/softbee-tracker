import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ProjectList } from 'components/ProjectList/ProjectList';
import { Stack, Typography } from '@mui/material';

import { ProjectFilters } from './ProjectFilters';
import { MainWrapper, SideBars } from 'components';
import { Button } from 'legos';
import { PROJECTS_LIST_QUERY } from 'api';
import { ProjectEntityResponseCollection } from 'types/GraphqlTypes';

const ProjectPage = () => {
  const [status, setStatus] = useState('all');
  console.log(status);

  //TODO add projects info and info about PR

  const { data } = useQuery<{ projects: ProjectEntityResponseCollection }>(
    PROJECTS_LIST_QUERY
  );

  // console.log('Projects:', data?.projects.data);

  const projects = data?.projects.data;

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
          <ProjectFilters setStatus={setStatus} />
        </Stack>
        <ProjectList projectList={projects} status={status} />
      </Stack>
    </MainWrapper>
  );
};

export default ProjectPage;

import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ProjectList } from 'components/ProjectList/ProjectList';
import { Stack, Typography } from '@mui/material';
import { MainWrapper, SideBars, AddNewProject } from 'components';

import { filterItem, ProjectFilters } from './ProjectFilters';
import { Button } from 'legos';
import { ProjectEntityResponseCollection } from 'types/GraphqlTypes';
import { PROJECTS_LIST_QUERY } from 'api';

const ProjectPage = () => {
  const [isCreateProject, setIsCreateProject] = useState(false);

  const [status, setStatus] = useState(filterItem.map(({ value }) => value));

  //TODO add projects info and info about PR

  const { data } = useQuery<{ projects: ProjectEntityResponseCollection }>(
    PROJECTS_LIST_QUERY
  );
  const projects = data?.projects.data.filter((project) =>
    status.includes(project.attributes?.status as string)
  );
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
            onClick={() => setIsCreateProject(!isCreateProject)}
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
        <ProjectList projectList={projects} />
      </Stack>
    </MainWrapper>
  );
};

export default ProjectPage;

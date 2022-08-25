import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ProjectList } from 'components/ProjectList/ProjectList';
import { Stack, Typography } from '@mui/material';
import { MainWrapper, SideBars, AddNewProject } from 'components';

import { filterItem, ProjectFilters } from './ProjectFilters';
import { Button } from 'legos';
import { ProjectEntityResponseCollection } from 'types/GraphqlTypes';
import { PROJECTS_LIST_QUERY } from 'api';
import { useNormalizedUsers } from 'hooks';

const ProjectPage = () => {
  const { managersChoices } = useNormalizedUsers();
  const [isCreateProject, setIsCreateProject] = useState(false);

  const [status, setStatus] = useState(filterItem.map(({ value }) => value));
  const [searchProjects, setSearchProjects] = useState('');
  const [selectedManager, setSelectedManager] = useState(['']);

  const { data } = useQuery<{ projects: ProjectEntityResponseCollection }>(
    PROJECTS_LIST_QUERY
  );


  console.log(selectedManager, 'manag');

  const projects = data?.projects.data
    .filter((project) => status.includes(project.attributes?.status as string))
    .filter((project) =>
      project.attributes?.name
        .toLowerCase()
        .includes(searchProjects.toLowerCase())
    );
  // .filter((project) =>
  //   project.attributes?.managers?.data
  //     .map(({ id }) => id)
  //     .map((item) => {
  //       selectedManager.some(item);
  //       console.log(selectedManager.some(item), 'some');
  //     })
  // );
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
      {isCreateProject ? (
        <AddNewProject setIsCreateProject={setIsCreateProject} />
      ) : (
        <>
          <Typography variant="h1">Project</Typography>
          <Stack mt={4} spacing={2}>
            <Stack direction="row" spacing={2} mb={4}>
              <ProjectFilters
                setSelectedManager={setSelectedManager}
                searchProjects={searchProjects}
                setSearchProjects={setSearchProjects}
                setStatus={setStatus}
              />
            </Stack>
            <ProjectList projectList={projects} />
          </Stack>
        </>
      )}
    </MainWrapper>
  );
};

export default ProjectPage;

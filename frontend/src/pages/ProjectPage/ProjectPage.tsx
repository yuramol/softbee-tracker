import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Stack, Typography } from '@mui/material';

import { ProjectList } from 'components/ProjectList/ProjectList';
import { MainWrapper, SideBars, AddNewProject } from 'components';
import { statusItem, ProjectFilters } from './ProjectFilters';
import { Button } from 'legos';
import { PROJECTS_LIST_QUERY } from 'api';
import { useNormalizedUsers } from 'hooks';
import { ProjectEntityResponseCollection } from 'types/GraphqlTypes';
import { PageProps } from 'pages/types';

const ProjectPage: React.FC<PageProps> = ({ title }) => {
  const { managersChoices } = useNormalizedUsers();

  const [isCreateProject, setIsCreateProject] = useState(false);
  const [searchProject, setSearchProject] = useState('');
  const [searchManagers, setSearchManagers] = useState<string[]>([]);
  const [searchStatus, setSearchStatus] = useState(
    statusItem.map(({ value }) => value)
  );

  const projectFilters = {
    searchProject,
    searchManagers,
    setSearchProject,
    setSearchManagers,
    setSearchStatus,
  };

  const { data } = useQuery<{ projects: ProjectEntityResponseCollection }>(
    PROJECTS_LIST_QUERY
  );

  const projects = data?.projects.data
    .filter(({ attributes }) =>
      searchStatus.includes(attributes?.status as string)
    )
    .filter(({ attributes }) => {
      const managersInProject = attributes?.managers?.data.filter(({ id }) =>
        searchManagers.length > 0
          ? searchManagers.includes(id as string)
          : managersChoices.map(({ value }) => value).includes(id as string)
      );

      const isManagerInProject = managersInProject
        ? managersInProject.length > 0
        : false;

      return isManagerInProject;
    })
    .filter(({ attributes }) =>
      attributes?.name.toLowerCase().includes(searchProject.toLowerCase())
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
      {isCreateProject ? (
        <AddNewProject setIsCreateProject={setIsCreateProject} />
      ) : (
        <>
          <Typography variant="h1">{title}</Typography>
          <Stack mt={4} spacing={2}>
            <Stack direction="row" spacing={2} mb={4}>
              <ProjectFilters {...projectFilters} />
            </Stack>
            <ProjectList projectList={projects} />
          </Stack>
        </>
      )}
    </MainWrapper>
  );
};

export default ProjectPage;

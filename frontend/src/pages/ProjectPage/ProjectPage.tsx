import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';

import { ProjectsList } from 'components/ProjectsList/ProjectsList';
import { MainWrapper, SideBars, AddNewProject } from 'components';
import { statusItem, ProjectFilters } from './ProjectFilters';
import { Button } from 'legos';
import { useNormalizedUsers, useProjects } from 'hooks';
import { PageProps } from 'pages/types';

const ProjectPage: React.FC<PageProps> = ({ title }) => {
  const { projects } = useProjects();
  const { managersChoices } = useNormalizedUsers();
  const [isCreateProject, setIsCreateProject] = useState(false);
  const [searchProject, setSearchProject] = useState('');
  const [searchManagers, setSearchManagers] = useState<string[]>([]);
  const [searchStatus, setSearchStatus] = useState(
    statusItem.map(({ value }) => value)
  );

  const [projectStatus, setProjectStatus] = useState('Add New Project');
  const [projectId, setProjectId] = useState('');

  const projectFilters = {
    searchProject,
    searchManagers,
    setSearchProject,
    setSearchManagers,
    setSearchStatus,
  };
  const onToggleForm = () => {
    setIsCreateProject(!isCreateProject);
    setProjectStatus('Add New Project');
    setProjectId('');
  };
  const filteredProjects = projects
    ?.filter(({ attributes }) =>
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
          {!isCreateProject && (
            <Button
              sx={{ mb: 2 }}
              fullWidth
              variant="contained"
              title="Add new project"
              size="large"
              onClick={onToggleForm}
            />
          )}
          <SideBars />
        </>
      }
    >
      {isCreateProject ? (
        <AddNewProject
          setIsCreateProject={setIsCreateProject}
          projectStatus={projectStatus}
          projectId={projectId}
        />
      ) : (
        <>
          <Typography variant="h1">{title}</Typography>
          <Stack mt={4} spacing={2}>
            <Stack direction="row" spacing={2} mb={4}>
              <ProjectFilters {...projectFilters} />
            </Stack>
            <ProjectsList
              projectsList={filteredProjects}
              setIsCreateProject={setIsCreateProject}
              setProjectStatus={setProjectStatus}
              setProjectId={setProjectId}
            />
          </Stack>
        </>
      )}
    </MainWrapper>
  );
};

export default ProjectPage;

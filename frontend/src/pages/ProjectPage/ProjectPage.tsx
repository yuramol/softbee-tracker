import React, { useState } from 'react';
import { Close } from '@mui/icons-material';
import { Drawer, IconButton, Stack, Typography } from '@mui/material';

import { Button } from 'legos';
import { useProjects } from 'hooks';
import { PageProps } from 'pages/types';
import { ProjectFilters } from './ProjectFilters';
import { ProjectsList } from 'components/ProjectsList/ProjectsList';
import { MainWrapper, AddNewProject, TimeInspector } from 'components';

const ProjectPage: React.FC<PageProps> = ({ title }) => {
  const { projects } = useProjects();
  const [openDrawer, setOpenDrawer] = useState(false);

  const [isCreateProject, setIsCreateProject] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [managerFilter, setManagerFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState('active');
  const [projectId, setProjectId] = useState('');

  const onToggleForm = () => {
    setIsCreateProject(!isCreateProject);
    setProjectId('');
  };
  const filteredProjects = projects?.filter(({ attributes }) => {
    if (
      (statusFilter === 'all' || statusFilter === attributes?.status) &&
      attributes?.name.toLowerCase().includes(searchFilter.toLowerCase()) &&
      ((managerFilter.length > 0 &&
        managerFilter.includes(attributes?.manager?.data?.id ?? '')) ||
        managerFilter.length === 0)
    ) {
      return true;
    }
    return false;
  });

  const toggleDrawer = () => setOpenDrawer(!openDrawer);

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
          <TimeInspector />
        </>
      }
    >
      <Button
        sx={{ mb: 2, display: { lg: 'none' } }}
        variant="contained"
        title="Open sidebar"
        size="large"
        onClick={toggleDrawer}
      />
      {isCreateProject ? (
        <AddNewProject
          setIsCreateProject={setIsCreateProject}
          projectId={projectId}
        />
      ) : (
        <>
          <Typography variant="h1">{title}</Typography>
          <Stack mt={4} spacing={2}>
            <Stack direction="row" spacing={2} mb={4}>
              <ProjectFilters
                searchFilter={searchFilter}
                managerFilter={managerFilter}
                statusFilter={statusFilter}
                onSearchFilterChange={(value) => setSearchFilter(value)}
                onManagerFilterChange={(value) => setManagerFilter(value)}
                onStatusFilterChange={(value) => setStatusFilter(value)}
              />
            </Stack>
            <ProjectsList
              projectsList={filteredProjects}
              setIsCreateProject={setIsCreateProject}
              setProjectId={setProjectId}
            />
          </Stack>
        </>
      )}
      <Drawer open={openDrawer} onClose={toggleDrawer} sx={{ m: 4 }}>
        <Stack position="relative" flexDirection="column" p={4} pt={8}>
          <IconButton
            onClick={toggleDrawer}
            sx={{ position: 'absolute', top: 5, right: 5 }}
          >
            <Close />
          </IconButton>
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
          <TimeInspector />
        </Stack>
      </Drawer>
    </MainWrapper>
  );
};

export default ProjectPage;

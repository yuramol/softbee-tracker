import React from 'react';
import { Grid, IconButton, Link, Typography } from '@mui/material';

import { Avatar, Icon, NavLink } from 'legos';
import {
  ProjectEntity,
  Enum_Project_Type,
  Enum_Project_Status,
} from 'types/GraphqlTypes';
import { useUpdateProject } from 'hooks';

type ProjectsListProps = {
  projectsList?: ProjectEntity[];
  setIsCreateProject: React.Dispatch<React.SetStateAction<boolean>>;
  setProjectId: React.Dispatch<React.SetStateAction<string>>;
};

const getProjectIcon: (type?: string) => JSX.Element | null = (type) => {
  switch (type) {
    case Enum_Project_Type.TimeMaterial:
      return <Icon icon="paidOutlined" color="warning" />;
    case Enum_Project_Type.FixedPrice:
      return <Icon icon="paidOutlined" color="success" />;
    case Enum_Project_Type.NonProfit:
      return <Icon icon="paidOutlined" color="error" />;
    default:
      return null;
  }
};

export const ProjectsList = ({
  projectsList,
  setIsCreateProject,
  setProjectId,
}: ProjectsListProps) => {
  const handlerEditProject = (id: string) => {
    setIsCreateProject(true);
    setProjectId(id);
  };

  const { updateProject } = useUpdateProject();

  return (
    <>
      {projectsList?.map((project) => {
        const manager = project.attributes?.manager?.data?.attributes;
        return (
          <Grid
            key={project.id}
            container
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid
              item
              xs={7}
              sm={5}
              container
              direction="row"
              alignItems="center"
              flexWrap="nowrap"
              spacing={1}
            >
              <Grid item>{getProjectIcon(project.attributes?.type)}</Grid>

              <Grid
                item
                xs={6}
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                <NavLink to={`/project/${project.id}`}>
                  {project.attributes?.name}
                </NavLink>
                <Typography
                  fontSize="10px"
                  whiteSpace="normal"
                >{`${project.attributes?.start} - ${project.attributes?.end}`}</Typography>
              </Grid>
            </Grid>
            {manager && (
              <Grid item xs={4} sm={5}>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  width={{ md: '300px' }}
                >
                  <Grid item display={{ xs: 'none', sm: 'block' }}>
                    <Avatar
                      avatar={
                        manager?.avatar?.data?.attributes?.url
                          ? `${process.env.REACT_APP_URI}${manager?.avatar.data?.attributes?.url}`
                          : undefined
                      }
                      firstName={manager?.firstName}
                      lastName={manager?.lastName}
                    />
                  </Grid>
                  <Grid item>
                    <NavLink
                      to={`/profile/${project.attributes?.manager?.data?.id}`}
                      state={{ edit: false }}
                    >
                      {`${manager?.firstName} ${manager?.lastName}`}
                    </NavLink>
                  </Grid>
                </Grid>
              </Grid>
            )}

            <Grid item xs={1} sm={2}>
              <IconButton
                onClick={() => handlerEditProject(project.id as string)}
                aria-label="edit"
              >
                <Icon icon="editOutlined" />
              </IconButton>
              {project.attributes?.status === 'active' ? (
                <IconButton
                  aria-label="archive"
                  onClick={() =>
                    updateProject(project.id as string, {
                      name: project.attributes?.name,
                      status: 'archived' as Enum_Project_Status,
                    })
                  }
                >
                  <Icon icon="archiveOutlined" />
                </IconButton>
              ) : (
                <IconButton
                  aria-label="archive"
                  onClick={() =>
                    updateProject(project.id as string, {
                      name: project.attributes?.name,
                      status: 'active' as Enum_Project_Status,
                    })
                  }
                >
                  <Icon icon="unarchiveOutlined" />
                </IconButton>
              )}
            </Grid>
          </Grid>
        );
      })}
    </>
  );
};

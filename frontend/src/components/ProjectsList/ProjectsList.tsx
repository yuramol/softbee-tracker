import React from 'react';
import { Grid, IconButton, Link, Typography } from '@mui/material';

import { Avatar, Icon, NavLink } from 'legos';
import { ProjectEntity, Enum_Project_Type } from 'types/GraphqlTypes';

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
              xs={5}
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
                <Link to={`/project/${project.id}`} component={NavLink}>
                  {project.attributes?.name}
                </Link>
                <Typography fontSize="10px">{`${project.attributes?.start} - ${project.attributes?.start}`}</Typography>
              </Grid>
            </Grid>

            <Grid item xs={5}>
              <Grid
                container
                direction="row"
                alignItems="center"
                spacing={1}
                width="300px"
              >
                <Grid item>
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

            <Grid item xs={2}>
              <IconButton
                onClick={() => handlerEditProject(project.id as string)}
                aria-label="edit"
              >
                <Icon icon="editOutlined" />
              </IconButton>
              <Link to={`/project/${project.id}`} component={NavLink}>
                <IconButton aria-label="archive">
                  <Icon icon="archiveOutlined" />
                </IconButton>
              </Link>
            </Grid>
          </Grid>
        );
      })}
    </>
  );
};

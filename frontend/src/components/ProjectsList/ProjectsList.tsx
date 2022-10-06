import React from 'react';
import { Grid, IconButton, Link, Stack, Typography } from '@mui/material';

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
                      project.attributes?.manager?.data?.attributes?.avatar
                        ?.data?.attributes?.url
                        ? `${process.env.REACT_APP_URI}${project.attributes?.manager?.data?.attributes?.avatar.data?.attributes?.url}`
                        : undefined
                    }
                    firstName={
                      project.attributes?.manager?.data?.attributes?.firstName
                    }
                    lastName={
                      project.attributes?.manager?.data?.attributes?.lastName
                    }
                  />
                </Grid>
                <Grid item>
                  <NavLink
                    to={`/profile/${project.attributes?.manager?.data?.id}`}
                    state={{ edit: false }}
                  >
                    {`${project.attributes?.manager?.data?.attributes?.firstName} ${project.attributes?.manager?.data?.attributes?.lastName}`}
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
              <IconButton aria-label="archive">
                <Icon icon="archiveOutlined" />
              </IconButton>
            </Grid>
          </Grid>
        );
      })}
    </>
  );
};

import React, { Fragment } from 'react';

import { IconButton, Link, Stack, Typography } from '@mui/material';
import { Avatar, Icon } from 'legos';
import { ProjectEntity } from 'types/GraphqlTypes';

type ProjectListProps = {
  projectList: ProjectEntity[] | undefined;
  status: string;
};

const getProjectIcon: (type: string | undefined) => JSX.Element | null = (
  type
) => {
  switch (type) {
    case 'time_material':
      return <Icon icon="paidOutlined" color="warning" />;
    case 'fixed_price':
      return <Icon icon="paidOutlined" color="success" />;
    case 'non_profit':
      return <Icon icon="paidOutlined" color="error" />;
    default:
      return null;
  }
};

export const ProjectList = ({ projectList, status }: ProjectListProps) => {
  return (
    <>
      {projectList
        ?.filter((project) =>
          status === 'all'
            ? !project.attributes?.status.includes(status)
            : project.attributes?.status.includes(status)
        )
        .map((project) => (
          <Fragment key={project.id}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Stack>{getProjectIcon(project.attributes?.type)}</Stack>

                <Stack>
                  <Link href="*">{project.attributes?.name}</Link>
                  <Typography fontSize="10px">{`${project.attributes?.start} - ${project.attributes?.start}`}</Typography>
                </Stack>
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                width="300px"
              >
                <Avatar
                  avatar={
                    project.attributes?.managers?.data[0].attributes?.avatar
                      .data?.attributes?.url
                  }
                  name={
                    project.attributes?.managers?.data[0].attributes?.username
                  }
                />
                <Link href="*" underline="none">
                  {project.attributes?.managers?.data[0].attributes?.username}
                </Link>
              </Stack>

              <Stack direction="row">
                <IconButton aria-label="edit">
                  <Icon icon="editOutlined" />
                </IconButton>
                <IconButton aria-label="archive">
                  <Icon icon="archiveOutlined" />
                </IconButton>
              </Stack>
            </Stack>
          </Fragment>
        ))}
    </>
  );
};

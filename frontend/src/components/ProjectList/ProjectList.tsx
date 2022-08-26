import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { IconButton, Link, Stack, Typography } from '@mui/material';

import { Avatar, Icon } from 'legos';
import { ProjectEntity } from 'types/GraphqlTypes';

type ProjectListProps = {
  projectList: ProjectEntity[] | undefined;
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

export const ProjectList = ({ projectList }: ProjectListProps) => {
  return (
    <>
      {projectList?.map((project) => (
        <Stack
          key={project.id}
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Stack>{getProjectIcon(project.attributes?.type)}</Stack>

            <Stack>
              <Link component={RouterLink} to="*" underline="none">
                {project.attributes?.name}
              </Link>
              <Typography fontSize="10px">{`${project.attributes?.start} - ${project.attributes?.start}`}</Typography>
            </Stack>
          </Stack>

          <Stack gap={2}>
            {project.attributes?.managers?.data.map(({ id, attributes }) => (
              <Stack
                key={id}
                direction="row"
                alignItems="center"
                spacing={1}
                width="300px"
              >
                <Avatar
                  avatar={
                    attributes?.avatar.data?.attributes?.url
                      ? `${process.env.REACT_APP_URI}${attributes?.avatar.data?.attributes?.url}`
                      : undefined
                  }
                  firstName={attributes?.firstName}
                  lastName={attributes?.lastName}
                />
                <Link
                  component={RouterLink}
                  to={`/profile/view/${id}`}
                  underline="none"
                >
                  {`${attributes?.firstName} ${attributes?.lastName}`}
                </Link>
              </Stack>
            ))}
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
      ))}
    </>
  );
};

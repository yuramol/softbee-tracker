import React, { Fragment, ReactElement } from 'react';

import { IconButton, Link, Stack, Typography } from '@mui/material';
import { Avatar, Icon } from 'legos';

type ProjectListType = {
  id: string | number;
  projectName: string;
  timeLine: string;
  projectManager: string;
  type: string;
  projectManagerAvatar?: string;
};
type ProjectListProps = {
  projectList: ProjectListType[];
};

const getProjectIcon: (type: string) => JSX.Element | null = (type) => {
  switch (type) {
    case 'timeMaterial':
      return <Icon icon="paidOutlined" color="warning" />;
    case 'fixedPrice':
      return <Icon icon="paidOutlined" color="success" />;
    case 'nonProfit':
      return <Icon icon="paidOutlined" color="error" />;
    default:
      return null;
  }
};
export const ProjectList = ({ projectList }: ProjectListProps) => (
  <>
    {projectList.map((project) => (
      <Fragment key={project.id}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Stack>{getProjectIcon(project.type)}</Stack>

            <Stack>
              <Link href="*">{project.projectName}</Link>
              <Typography fontSize="10px">{project.timeLine}</Typography>
            </Stack>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1} width="300px">
            <Avatar
              avatar={project.projectManagerAvatar}
              name={project.projectManager}
            />
            <Link href="*" underline="none">
              {project.projectManager}
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

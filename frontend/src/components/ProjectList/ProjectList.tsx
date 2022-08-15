import React, { Fragment, ReactElement } from 'react';

import { IconButton, Link, Stack, Typography } from '@mui/material';
import { Avatar, Icon } from 'legos';

//TODO add projects info and info about PR
const projects = [
  {
    id: 1,
    projectName: 'UpWork',
    timeLine: '20.11.21-12.12.23',
    firstName: 'df',
    lastName: 'df',
    type: 'paid',
  },
  {
    id: 3,
    projectName: 'Plumbid',
    timeLine: '20.11.21-12.12.23',
    firstName: 'df',
    lastName: 'df',
    type: 'paid',
  },
  {
    id: 4,
    projectName: 'PalPal',
    timeLine: '20.11.21-12.12.23',
    firstName: 'Stas',
    lastName: 'Babuch',
    type: 'unpaid',
    projectManagerAvatar: 'https://i.pravatar.cc/300',
  },
];

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
              firstName={project.firstName}
              lastName={project.lastName}
            />
            <Link href="*" underline="none">
              {`${project.firstName} ${project.lastName}`}
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

import React, { Fragment } from 'react';
import { IconButton, Link, Stack, Typography } from '@mui/material';

import { Box } from '@mui/system';
import { Avatar, Icon, Select, SelectField } from 'legos';
import { Filter } from '@mui/icons-material';

//TODO add projects info and info about PR
const projects = [
  {
    id: 1,
    projectName: 'UpWork',
    timeLine: '20.11.21-12.12.23',
    projectManager: 'Oleksandr Zastavnyi',
    type: 'paid',
  },
  {
    id: 3,
    projectName: 'Plumbid',
    timeLine: '20.11.21-12.12.23',
    projectManager: 'Yura Moldavchuk',
    type: 'paid',
  },
  {
    id: 4,
    projectName: 'PalPal',
    timeLine: '20.11.21-12.12.23',
    projectManager: 'Andrev Antonuch',
    type: 'unpaid',
    projectManagerAvatar: 'https://i.pravatar.cc/300',
  },
];
const itemSelectProject = [{ label: 'date' }, { label: 'pm' }];

export const ProjectList = () => (
  <>
    {/* <Icon icon="Filter" color="success" /> */}
    <Select
      onChange={() => {
        console.log('s');
      }}
      label="Filters"
      items={itemSelectProject}
    />
    <Stack spacing={2}>
      {projects.map((project) => (
        <Fragment key={project.id}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box>
                {project.type == 'paid' ? (
                  <Icon icon="paidOutlined" color="success" />
                ) : (
                  <Icon icon="moneyOff" color="warning" />
                )}
              </Box>

              <Box>
                <Link href="*">{project.projectName}</Link>
                <Typography fontSize="10px">{project.timeLine}</Typography>
              </Box>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              width="300px"
            >
              <Avatar
                avatar={project.projectManagerAvatar}
                name={project.projectManager}
              />
              <Link href="*" underline="none">
                {project.projectManager}
              </Link>
            </Stack>

            <Box>
              <IconButton aria-label="edit">
                <Icon icon="editOutlined" />
              </IconButton>
              <IconButton aria-label="archive">
                <Icon icon="archiveOutlined" />
              </IconButton>
            </Box>
          </Stack>
        </Fragment>
      ))}
    </Stack>
  </>
);

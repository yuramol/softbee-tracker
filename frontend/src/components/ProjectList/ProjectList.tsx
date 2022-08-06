import React, { Fragment } from 'react';
import { Avatar, Grid, IconButton, Link, Typography } from '@mui/material';

import { Box } from '@mui/system';
import { UniversalAvatar, Icon } from 'legos';

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

export const ProjectList = () => (
  <>
    <Typography sx={{ mt: 3 }} variant="h5">
      Projects
    </Typography>
    <Grid
      sx={{ mt: 2 }}
      container
      spacing={2}
      justifyContent="space-between"
      alignItems="flex-start"
    >
      {projects.map((project) => (
        <Fragment key={project.id}>
          <Grid item xs={4} container alignItems="center">
            <Avatar sx={{ backgroundColor: 'common.lightBackground', mr: 3 }}>
              {project.type == 'paid' ? (
                <Icon icon="paidOutlined" color="blue" />
              ) : (
                <Icon icon="moneyOff" color="red" />
              )}
            </Avatar>
            <Box>
              <Link href="*">{project.projectName}</Link>
              <Typography fontSize="10px">{project.timeLine}</Typography>
            </Box>
          </Grid>
          <Grid container gap={2} item xs={4} alignItems="center">
            <UniversalAvatar
              avatar={project.projectManagerAvatar}
              name={project.projectManager}
            />
            <Link href="*" underline="none">
              {project.projectManager}
            </Link>
          </Grid>
          <Grid item container xs={2}>
            <IconButton aria-label="edit">
              <Icon icon="editOutlined" />
            </IconButton>
            <IconButton aria-label="archive">
              <Icon icon="archiveOutlined" />
            </IconButton>
          </Grid>
        </Fragment>
      ))}
    </Grid>
  </>
);

import React, { Fragment } from 'react';
import {
  Avatar as MuiAvatar,
  Grid,
  IconButton,
  Link,
  Typography,
} from '@mui/material';

import { Box } from '@mui/system';
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
            <Box>
              <Link href="*">{project.projectName}</Link>
              <Typography fontSize="10px">{project.timeLine}</Typography>
            </Box>
          </Grid>
          <Grid container gap={2} item xs={4} alignItems="center">
            <Avatar
              avatar={project.projectManagerAvatar}
              firstName={project.firstName}
              lastName={project.lastName}
            />
            <Link href="*" underline="none">
              {`${project.firstName} ${project.lastName}`}
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

import * as React from 'react';
import Box from '@mui/material/Box';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { theme } from '../../theme';

export const TotalTime = () => {
  //TODO add project time info and limits
  const totalTime = [
    {
      name: 'day',
      day: '2',
      week: '32',
      month: '56',
      dayLimit: '1',
      weekLimit: '5',
      monthLimit: '45',
    },
    {
      name: 'week',
      day: '2',
      week: '32',
      month: '56',
      dayLimit: '1',
      weekLimit: '5',
      monthLimit: '45',
    },
    {
      name: 'month',
      day: '2',
      week: '32',
      month: '56',
      dayLimit: '1',
      weekLimit: '5',
      monthLimit: '45',
    },
  ];
  return (
    <Box>
      <Typography variant="h6">Total time</Typography>
      <List>
        {totalTime.map((pro) => (
          <ListItem
            key={pro.name}
            sx={{
              p: 0,
              justifyContent: 'space-between',
              display: 'flex',
              color: theme.palette.common.grey,
            }}
          >
            <AccessTimeIcon />
            <ListItemText
              sx={{ ml: 1, color: theme.palette.common.grey }}
              primary={pro.name}
            />
            <ListItemText sx={{ display: 'contents' }} />
            <Typography>{pro.dayLimit}</Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

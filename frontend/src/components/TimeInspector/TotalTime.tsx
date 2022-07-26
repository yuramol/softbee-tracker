import * as React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { theme } from '../../theme';

//TODO add project time info and limits
const totalTime = [
  {
    type: 'Day',
    totalTime: '2',
    timeLimit: '5',
  },
  {
    type: 'Week',
    totalTime: '15',
    timeLimit: '25',
  },
  {
    type: 'Month',
    totalTime: '98',
    timeLimit: '110',
  },
];

export const TotalTime = () => {
  return (
    <>
      <Typography variant="h6">Total time</Typography>
      <List>
        {totalTime.map((time) => (
          <ListItem
            key={time.type}
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
              primary={time.type}
            />
            <ListItemText
              sx={{ display: 'contents' }}
              primary={`${time.totalTime} / ${time.timeLimit}`}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

import CircleIcon from '@mui/icons-material/Circle';

const iconStyle = {
  width: '8px',
  height: '8px',
  marginRight: '10px',
};
const listItemStyle = {
  padding: '2px 16px',
  '& .MuiListItemIcon-root': {
    minWidth: 0,
  },
};

export const LegendCalendar = () => {
  return (
    <List>
      <ListItem sx={listItemStyle}>
        <ListItemIcon>
          <CircleIcon style={{ ...iconStyle, color: '#ff0000' }} />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography variant="subtitle2">Day you have to track</Typography>
          }
        />
      </ListItem>
      <ListItem sx={listItemStyle}>
        <ListItemIcon>
          <CircleIcon style={{ ...iconStyle, color: '#ffa500' }} />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography variant="subtitle2">Holiday / Weekend</Typography>
          }
        />
      </ListItem>
      <ListItem sx={listItemStyle}>
        <ListItemIcon>
          <CircleIcon style={{ ...iconStyle, color: '#008000' }} />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography variant="subtitle2">Day you&#39;ve tracked</Typography>
          }
        />
      </ListItem>
    </List>
  );
};

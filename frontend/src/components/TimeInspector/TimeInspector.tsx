import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';

import { theme } from '../../theme';

const options = [
  { id: 1, label: 'Day', value: 'day' },
  { id: 2, label: 'Week', value: 'week' },
  { id: 3, label: 'Month', value: 'month' },
];
//TODO add project time info and limits
const Projects = [
  {
    name: 'tracker',
    day: '2',
    week: '32',
    month: '56',
    dayLimit: '1',
    weekLimit: '5',
    monthLimit: '45',
  },
  {
    name: 'SoftBee Internal Work',
    day: '2',
    week: '32',
    month: '56',
    dayLimit: '1',
    weekLimit: '5',
    monthLimit: '45',
  },
];

export const TimeInspector = () => {
  const [reportType, setReportType] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setReportType(event.target.value as string);
  };
  const getWorkedHours = (project: {
    day: string;
    week: string;
    month: string;
    dayLimit: string;
    weekLimit: string;
    monthLimit: string;
  }) => {
    if (reportType == 'day') {
      return `${project.day} / ${project.dayLimit}`;
    } else if (reportType == 'week') {
      return `${project.week} / ${project.weekLimit}`;
    } else {
      return `${project.month} / ${project.monthLimit}`;
    }
  };

  return (
    <>
      <Typography variant="h5">Time insperctor</Typography>

      <FormControl fullWidth sx={{ my: 2 }}>
        <InputLabel>Filter</InputLabel>
        <Select label="Filter" value={reportType} onChange={handleChange}>
          {options.map((item) => (
            <MenuItem key={item.id} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <List>
        {Projects.map((project) => (
          <ListItem
            key={project.name}
            sx={{
              p: 0,
              color: theme.palette.common.grey,
            }}
          >
            <FolderIcon />
            <ListItemText
              sx={{ ml: 1, color: theme.palette.common.grey }}
              primary={project.name}
            />
            <ListItemText
              sx={{ display: 'contents' }}
              primary={getWorkedHours(project)}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

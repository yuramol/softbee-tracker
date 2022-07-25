import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
  InputLabel,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import { theme } from '../../theme';
import { useState } from 'react';

export const TimeInspector = () => {
  //TODO add project time info and limits
  const Project = [
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
  const [reportType, setReportType] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setReportType(event.target.value as string);
  };

  return (
    <Box>
      <Typography variant="h5">Time insperctor</Typography>
      <FormControl fullWidth sx={{ my: 2 }}>
        <InputLabel>Filter</InputLabel>
        <Select label="Filter" value={reportType} onChange={handleChange}>
          <MenuItem value={'day'}>Day</MenuItem>
          <MenuItem value={'week'}>Week</MenuItem>
          <MenuItem value={'month'}>Month</MenuItem>
        </Select>
      </FormControl>
      <List>
        {Project.map((pro) => (
          <ListItem
            key={pro.name}
            sx={{
              p: 0,
              justifyContent: 'space-between',
              display: 'flex',
              color: theme.palette.common.grey,
            }}
          >
            <FolderIcon />
            <ListItemText
              sx={{ ml: 1, color: theme.palette.common.grey }}
              primary={pro.name}
            />
            <ListItemText
              sx={{ display: 'contents' }}
              primary={
                reportType == 'day'
                  ? pro.day
                  : pro.week && reportType == 'month'
                  ? pro.month
                  : pro.week
              }
            />
            <Typography>
              /
              {reportType == 'day'
                ? pro.dayLimit
                : pro.weekLimit && reportType == 'month'
                ? pro.monthLimit
                : pro.weekLimit}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

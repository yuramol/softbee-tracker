import * as React from 'react';
import Box from '@mui/material/Box';
import { TimeInspector } from './TimeInspector';
import { TotalTime } from './TotalTime';

export const TimeSection = () => {
  return (
    <Box>
      <TimeInspector />
      <TotalTime />
    </Box>
  );
};

import React from 'react';
import { Box, CircularProgress } from '@mui/material';

export const Loader = () => {
  return (
    <Box display="flex" height="50vh">
      <CircularProgress sx={{ margin: 'auto' }} />
    </Box>
  );
};

import { Box, Container, Typography } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import React, { FC, useState } from 'react';
import { ButtonDay } from '../buttons/ButtonDay';
export const DayViewTracker: FC = () => {
  const [isDay, setIsDay] = useState(true);

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ButtonDay sx={{ mr: '10px' }}>
            <NavigateBeforeIcon />
          </ButtonDay>
          <ButtonDay>
            <NavigateNextIcon />
          </ButtonDay>
          <Typography sx={{ ml: '10px' }} variant="h5">
            Today: Monday, 11 Jul
          </Typography>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Box onClick={!isDay ? () => setIsDay(!isDay) : undefined}>
            <ButtonDay isActive={isDay} sx={{ mr: '10px' }}>
              Day
            </ButtonDay>
          </Box>
          <Box onClick={isDay ? () => setIsDay(!isDay) : undefined}>
            <ButtonDay isActive={!isDay}>Week</ButtonDay>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

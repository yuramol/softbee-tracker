import React, { FC, useState } from 'react';

import { Box, Container, Typography } from '@mui/material';
import { DayTrackerTabs } from '../DayTrackerTabs';
import { ButtonDay } from '../buttons/ButtonDay';

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export const DayViewTracker: FC = () => {
  const [isDay, setIsDay] = useState(true);
  const [tabsValue, setTabsValue] = useState(1);

  const dataTabs = [
    {
      value: 3,
      project: [
        {
          title: 'Mobile app',
          duraction: '08:00',
          description: 'pet project ',
        },
        {
          title: 'Mobile app two',
          duraction: '03:00',
          description: 'pet project ',
        },
      ],
    },
    {
      value: 2,
      project: [
        {
          title: 'Mobile app',
          duraction: '08:00',
          description: 'pet project ',
        },
      ],
    },
    {
      value: 1,
      project: [
        {
          title: 'Mobile app two',
          duraction: '03:00',
          description: 'pet project ',
        },
      ],
    },
  ];

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
      <Box>
        <Box sx={{ mt: '10px' }}>
          <DayTrackerTabs
            dataTabs={dataTabs}
            setTabsValue={setTabsValue}
            tabsValue={tabsValue}
          />
        </Box>
      </Box>
    </Container>
  );
};

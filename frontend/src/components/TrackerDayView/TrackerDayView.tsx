import React, { createContext, useState } from 'react';

import { Box, Typography, Button } from '@mui/material';
import { DayTrackerTabs } from '../DayTrackerTabs';

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Query } from '../../types/GraphqlTypes';
import { useCurrentWeek } from '../../hooks';
import { format, parse } from 'date-fns';
import { Maybe } from 'graphql/jsutils/Maybe';

const GET_CURRENT_WEEK_TRACKERS = gql`
  query ($weekStart: Date!, $weekEnd: Date!) {
    usersPermissionsUser(id: 1) {
      data {
        id
        attributes {
          username
          trackers(
            sort: "date"
            filters: { date: { between: [$weekStart, $weekEnd] } }
          ) {
            data {
              id
              attributes {
                date
                duration
                description
                project {
                  data {
                    attributes {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const UPDATE_TIME_DURATION = gql`
  mutation UpdateTimeDuration($id: ID!, $time: Time!) {
    updateTracker(id: $id, data: { duration: $time }) {
      data {
        attributes {
          duration
        }
      }
    }
  }
`;

type TimeContextType = {
  onUpdateTime: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    id: Maybe<string>
  ) => void;
};

export const TimeContext = createContext<TimeContextType | null>(null);

export const TrackerDayView = () => {
  const { weekEnd, weekStart, days, currentDay } = useCurrentWeek();
  const { data, refetch } = useQuery<Query>(GET_CURRENT_WEEK_TRACKERS, {
    variables: { weekStart, weekEnd },
  });
  const [isDayWiew, setIsDayWiew] = useState(true);
  const [tabsValue, setTabsValue] = useState(+currentDay - 1);
  const [mutationTime] = useMutation(UPDATE_TIME_DURATION);

  console.log(tabsValue, isDayWiew);

  const onUpdateTime = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    id: Maybe<string>
  ) => {
    const parseTime = format(
      parse(e.target.value, 'HH:mm', new Date()),
      'HH:mm:ss.SSS'
    );
    mutationTime({ variables: { id, time: parseTime } });
    refetch();
  };

  const currentData =
    data?.usersPermissionsUser?.data?.attributes?.trackers?.data;

  return (
    <TimeContext.Provider value={{ onUpdateTime }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            variant="outlined"
            sx={{ mr: '10px' }}
            disabled={tabsValue === 0}
            onClick={() => setTabsValue(tabsValue - 1)}
          >
            <NavigateBeforeIcon />
          </Button>
          <Button
            variant="outlined"
            sx={{ mr: '10px' }}
            disabled={tabsValue === 6}
            onClick={() => setTabsValue(tabsValue + 1)}
          >
            <NavigateNextIcon />
          </Button>
          <Typography sx={{ ml: '10px' }} variant="h5">
            {days[tabsValue].day} {days[tabsValue].date}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Button
            variant={isDayWiew ? 'contained' : 'outlined'}
            sx={{ mr: '10px' }}
            onClick={() => setIsDayWiew(isDayWiew ? true : !isDayWiew)}
          >
            Day
          </Button>
          <Button
            variant={!isDayWiew ? 'contained' : 'outlined'}
            onClick={() => setIsDayWiew(!isDayWiew ? false : !isDayWiew)}
          >
            Week
          </Button>
        </Box>
      </Box>
      <Box>
        <Box sx={{ mt: '10px' }}>
          <DayTrackerTabs
            dataTabs={currentData}
            setTabsValue={setTabsValue}
            tabsValue={tabsValue}
          />
        </Box>
      </Box>
    </TimeContext.Provider>
  );
};

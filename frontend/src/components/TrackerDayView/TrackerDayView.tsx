import React, { createContext, useState } from 'react';

import { useQuery, useMutation } from '@apollo/client';
import { format } from 'date-fns';
import { Typography, Button, Grid } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { useAuth } from '../../AuthProvider';
import { useCurrentWeek } from '../../hooks';
import { DayTabs } from './DayTabs';
import { TrackerAddNewEntry } from '../TrackerAddNewEntry';
import {
  Maybe,
  TrackerEntityResponseCollection,
} from '../../types/GraphqlTypes';
import {
  TRECKERS_BY_USER_ID_QUERY,
  UPDATE_TRACKER_BY_ID_MUTATION,
} from '../../api';

export type TimeContextType = {
  onUpdateTime: (time: Date, id: Maybe<string> | undefined) => void;
};

export const TimeContext = createContext<TimeContextType>(
  {} as TimeContextType
);

export const TrackerDayView = () => {
  const { user } = useAuth();
  const { weekEnd, weekStart, days, currentDay } = useCurrentWeek(new Date());
  const [tabsValue, setTabsValue] = useState(currentDay);

  const { data, refetch } = useQuery<{
    trackers: TrackerEntityResponseCollection;
  }>(TRECKERS_BY_USER_ID_QUERY, {
    variables: { userId: user.id, weekStart, weekEnd },
  });
  const [mutationTime] = useMutation(UPDATE_TRACKER_BY_ID_MUTATION);

  const onUpdateTime = (time: Date, id: Maybe<string>) => {
    const formatedTime = format(time, 'HH:mm:ss.SSS');
    mutationTime({ variables: { id, time: formatedTime } }).then(() => {
      refetch();
    });
  };

  return (
    <TimeContext.Provider value={{ onUpdateTime } as TimeContextType}>
      <Grid container gap={2} marginTop={6}>
        <Button
          variant="outlined"
          disabled={tabsValue === 0}
          onClick={() => setTabsValue(tabsValue - 1)}
        >
          <NavigateBeforeIcon />
        </Button>
        <Button
          variant="outlined"
          disabled={tabsValue === 6}
          onClick={() => setTabsValue(tabsValue + 1)}
        >
          <NavigateNextIcon />
        </Button>
        <Typography variant="h6" marginLeft={2}>
          {days[tabsValue].day}, {days[tabsValue].date}
        </Typography>
      </Grid>
      <Grid marginY={4}>
        <DayTabs
          dataTabs={data?.trackers.data}
          setTabsValue={setTabsValue}
          tabsValue={tabsValue}
        />
      </Grid>
      <TrackerAddNewEntry />
    </TimeContext.Provider>
  );
};

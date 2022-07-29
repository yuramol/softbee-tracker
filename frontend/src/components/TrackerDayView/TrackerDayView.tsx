import React, { createContext, useState } from 'react';

import { useQuery, useMutation } from '@apollo/client';
import {
  addDays,
  format,
  isAfter,
  isEqual,
  isFuture,
  startOfDay,
  startOfMonth,
  subDays,
} from 'date-fns';
import { Typography, Button, Grid } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { useAuth } from '../../AuthProvider';
import { useCurrentWeek } from '../../hooks';
import { DayTabs } from './DayTabs';
import { TrackerAddNewEntry } from '../TrackerAddNewEntry';
import {
  TRECKERS_BY_USER_ID_QUERY,
  UPDATE_TRACKER_BY_ID_MUTATION,
} from '../../api';
import { Role } from '../../constants';
import {
  Maybe,
  TrackerEntityResponseCollection,
} from '../../types/GraphqlTypes';

export type TimeContextType = {
  onUpdateTime: (time: Date, id: Maybe<string> | undefined) => void;
};

export const TimeContext = createContext<TimeContextType>(
  {} as TimeContextType
);

export const TrackerDayView = () => {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const { weekStart, weekEnd, days, currentDay } = useCurrentWeek(currentDate);
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

  const handleCurrentDate = () => {
    setCurrentDate(new Date());
    setTabsValue(+format(new Date(), 'i') - 1);
  };

  const handlePrevDate = () => {
    if (tabsValue === 0) {
      setTabsValue(6);
      setCurrentDate(subDays(new Date(weekStart), 1));
      return;
    }

    setTabsValue(tabsValue - 1);
  };

  const handleNextDate = () => {
    if (tabsValue === 6) {
      setTabsValue(0);
      setCurrentDate(addDays(new Date(weekEnd), 1));
      return;
    }

    setTabsValue(tabsValue + 1);
  };

  const isToday = isEqual(
    startOfDay(new Date()),
    startOfDay(new Date(days[tabsValue].fullDate))
  );

  const isStartEditForEmployee =
    isAfter(
      startOfMonth(currentDate),
      subDays(startOfDay(new Date(days[tabsValue].fullDate)), 1)
    ) && user.role.type === Role.Employee;

  const isEndEdit = isFuture(addDays(new Date(days[tabsValue].fullDate), 1));

  return (
    <TimeContext.Provider value={{ onUpdateTime } as TimeContextType}>
      <Grid
        container
        gap={2}
        marginTop={6}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid display="flex" gap={2}>
          <Button
            variant="outlined"
            disabled={isStartEditForEmployee}
            onClick={handlePrevDate}
          >
            <NavigateBeforeIcon />
          </Button>
          <Button
            variant="outlined"
            disabled={isEndEdit}
            onClick={handleNextDate}
          >
            <NavigateNextIcon />
          </Button>
          <Typography variant="h6" marginLeft={2}>
            {days[tabsValue].day}, {days[tabsValue].date}
          </Typography>
        </Grid>
        {!isToday && (
          <Grid>
            <Button variant="contained" onClick={handleCurrentDate}>
              Today
            </Button>
          </Grid>
        )}
      </Grid>
      <Grid marginY={4}>
        <DayTabs
          currentDate={currentDate}
          dataTabs={data?.trackers.data}
          tabsValue={tabsValue}
          setTabsValue={setTabsValue}
        />
      </Grid>
      <TrackerAddNewEntry />
    </TimeContext.Provider>
  );
};

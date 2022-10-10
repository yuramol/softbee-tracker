import React, { useEffect, useState } from 'react';

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
import { Typography, Button, Stack } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { DayTabs } from './DayTabs';
import { TrackerAddNewEntry } from 'components/TrackerAddNewEntry';

import { TrackerByDay } from 'hooks/useNormalizedTrackers';
import { useCurrentWeek } from 'hooks';

type TrackerDayViewProps = {
  selectedDay: Date;
  trackers: TrackerByDay[];
};

export const TrackerDayView = ({
  selectedDay,
  trackers,
}: TrackerDayViewProps) => {
  const [currentWeekDay, setCurrentWeekDay] = useState(selectedDay);
  const { weekStart, weekEnd, days, currentDay } =
    useCurrentWeek(currentWeekDay);
  const [tabsValue, setTabsValue] = useState(currentDay);

  useEffect(() => {
    const { currentDay } = useCurrentWeek(selectedDay);
    setCurrentWeekDay(selectedDay);
    setTabsValue(currentDay);
  }, [selectedDay]);

  const handleCurrentDate = () => {
    setCurrentWeekDay(new Date());
    setTabsValue(+format(new Date(), 'i') - 1);
  };

  const handlePrevDate = () => {
    if (tabsValue === 0) {
      setTabsValue(6);
      setCurrentWeekDay(subDays(new Date(weekStart), 1));
      return;
    }

    setTabsValue(tabsValue - 1);
  };

  const handleNextDate = () => {
    if (tabsValue === 6) {
      setTabsValue(0);
      setCurrentWeekDay(addDays(new Date(weekEnd), 1));
      return;
    }

    setTabsValue(tabsValue + 1);
  };

  const isToday = isEqual(
    startOfDay(new Date()),
    startOfDay(new Date(days[tabsValue].fullDate))
  );

  const isStartEditForEmployee = isAfter(
    startOfMonth(currentWeekDay),
    subDays(startOfDay(new Date(days[tabsValue].fullDate)), 1)
  );

  const isEndEdit = isFuture(addDays(new Date(days[tabsValue].fullDate), 1));

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mt={6}
      >
        <Stack direction="row" gap={2}>
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
          <Typography variant="h6" ml={2}>
            {days[tabsValue].day}, {days[tabsValue].date}
          </Typography>
        </Stack>
        {!isToday && (
          <Button variant="contained" onClick={handleCurrentDate}>
            Today
          </Button>
        )}
      </Stack>
      <DayTabs
        currentWeekDay={currentWeekDay}
        trackers={trackers}
        tabsValue={tabsValue}
        setTabsValue={setTabsValue}
      />
      <TrackerAddNewEntry currentDay={new Date(days[tabsValue].fullDate)} />
    </>
  );
};

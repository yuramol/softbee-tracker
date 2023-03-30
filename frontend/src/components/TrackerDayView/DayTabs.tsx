import React, { useMemo } from 'react';
import { Stack, Tab, Tabs, Typography } from '@mui/material';
import { isAfter, isFuture, startOfDay, startOfMonth } from 'date-fns';

import { PanelTab } from './PanelTab';
import { useCurrentWeek } from 'hooks';
import { getHours } from 'helpers';
import { TrackerByDay } from 'hooks/useNormalizedTrackers';

type Props = {
  currentWeekDay: Date;
  trackers: TrackerByDay[];
  tabsValue: number;
  setTabsValue: (newValue: number) => void;
};

export const DayTabs: React.FC<Props> = ({
  currentWeekDay,
  trackers,
  tabsValue,
  setTabsValue,
}) => {
  const { days } = useCurrentWeek(currentWeekDay);

  const totalByWeek = useMemo(() => {
    let totalTime = 0;
    days.forEach(({ fullDate }) => {
      const totalByDay =
        trackers.find(({ date }) => date === fullDate)?.total ?? 0;

      totalTime += totalByDay;
    });

    return getHours(totalTime);
  }, [days]);

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mt={4}
        borderBottom={2}
        borderColor="gray"
      >
        <Tabs
          value={tabsValue}
          onChange={(_, newValue) => {
            setTabsValue(newValue);
          }}
        >
          {days.map(({ day, fullDate }) => {
            const trackersByDay = trackers.find(
              ({ date }) => date === fullDate
            );
            const totalByDay = getHours(trackersByDay?.total ?? 0);
            return (
              <Tab
                key={fullDate}
                label={
                  <>
                    <Typography fontWeight={600}>{day}</Typography>
                    <Typography>{totalByDay}</Typography>
                  </>
                }
                disabled={
                  isAfter(
                    startOfMonth(currentWeekDay),
                    startOfDay(new Date(fullDate))
                  ) || isFuture(new Date(fullDate))
                }
              />
            );
          })}
        </Tabs>
        <Stack>
          <Typography fontWeight={600}>Week Total</Typography>
          <Typography textAlign="right">{totalByWeek}</Typography>
        </Stack>
      </Stack>
      {days.map(({ fullDate }, i) => {
        const trackersByDay = trackers.find(({ date }) => date === fullDate);

        return (
          <PanelTab
            key={fullDate}
            trackersByDay={trackersByDay}
            value={tabsValue}
            index={i}
          />
        );
      })}
    </>
  );
};

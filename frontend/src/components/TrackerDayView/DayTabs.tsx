import React from 'react';
import { Stack, Tab, Tabs, Typography } from '@mui/material';
import { isAfter, isFuture, startOfDay, startOfMonth } from 'date-fns';

import { PanelTab } from './PanelTab';
import { useCurrentWeek } from 'hooks';
import { getTotalTime } from 'helpers';
import { TrackerEntity } from 'types/GraphqlTypes';

type Props = {
  currentDate: Date;
  dataTabs: TrackerEntity[] | undefined;
  tabsValue: number;
  setTabsValue: (newValue: number) => void;
};

export const DayTabs: React.FC<Props> = ({
  currentDate,
  dataTabs,
  tabsValue,
  setTabsValue,
}) => {
  const { days } = useCurrentWeek(currentDate);
  const totalTime = getTotalTime(dataTabs);

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
          {days.map(({ day, fullDate }) => (
            <Tab
              key={fullDate}
              label={
                <>
                  <Typography fontWeight={600}>{day}</Typography>
                  <Typography>
                    {getTotalTime(
                      dataTabs?.filter(
                        ({ attributes }) => attributes?.date === fullDate
                      )
                    )}
                  </Typography>
                </>
              }
              disabled={
                isAfter(
                  startOfMonth(currentDate),
                  startOfDay(new Date(fullDate))
                ) || isFuture(new Date(fullDate))
              }
            />
          ))}
        </Tabs>
        <Stack>
          <Typography fontWeight={600}>Week Total</Typography>
          <Typography textAlign="right">{totalTime}</Typography>
        </Stack>
      </Stack>
      {days.map(({ fullDate }, i) => (
        <PanelTab
          key={fullDate}
          dataTabs={dataTabs?.filter(
            ({ attributes }) => attributes?.date === fullDate
          )}
          value={tabsValue}
          index={i}
        />
      ))}
    </>
  );
};

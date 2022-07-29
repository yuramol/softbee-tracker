import React, { FC } from 'react';
import { Grid, Tab, Tabs, Typography } from '@mui/material';

import { PanelTab } from './PanelTab';
import { useCurrentWeek } from '../../hooks';
import { getTotalTime } from '../../helpers';
import { TrackerEntity } from '../../types/GraphqlTypes';

type Props = {
  tabsValue: number;
  setTabsValue: (newValue: number) => void;
  dataTabs: TrackerEntity[] | undefined;
};

export const DayTabs: FC<Props> = ({ setTabsValue, tabsValue, dataTabs }) => {
  const { days } = useCurrentWeek(new Date());
  const totalTime = getTotalTime(dataTabs);

  return (
    <>
      <Grid display="flex" alignItems="center" justifyContent="space-between">
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
            />
          ))}
        </Tabs>
        <Grid>
          <Typography fontWeight={600}>Week Total</Typography>
          <Typography textAlign="right">{totalTime}</Typography>
        </Grid>
      </Grid>
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

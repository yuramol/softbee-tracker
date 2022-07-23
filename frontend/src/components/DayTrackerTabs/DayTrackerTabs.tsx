import { Tab, Tabs, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { FC } from 'react';
import { useCurrentWeek, useTotalTime } from '../../hooks';
import { TrackerEntity } from '../../types/GraphqlTypes';
import { TabDuration } from './TabDuration';
import { TabPanel } from './TabPanel';

type Props = {
  tabsValue: number;
  setTabsValue: (newValue: number) => void;
  dataTabs: TrackerEntity[] | undefined;
};

export const DayTrackerTabs: FC<Props> = ({
  setTabsValue,
  tabsValue,
  dataTabs,
}) => {
  const { days } = useCurrentWeek();

  const { totalTime } = useTotalTime(dataTabs);
  return (
    <Box>
      <>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Tabs
            value={tabsValue}
            onChange={(_, newValue) => {
              setTabsValue(newValue);
            }}
          >
            {days.map(({ day, fullDate }, i) => (
              <Tab
                key={i}
                label={
                  <Box>
                    <div>{day}</div>
                    {
                      <TabDuration
                        currentDateTracks={dataTabs?.filter(
                          ({ attributes }) => attributes?.date === fullDate
                        )}
                      />
                    }
                  </Box>
                }
              />
            ))}
          </Tabs>
          <Box>
            <Typography sx={{ fontSize: '14px' }}>Week Total</Typography>
            <Typography sx={{ textAlign: 'end', fontSize: '14px' }}>
              {totalTime}
            </Typography>
          </Box>
        </Box>
        {days.map(({ fullDate }, i) => {
          return (
            <TabPanel
              key={i}
              dataTabs={dataTabs?.filter(
                ({ attributes }) => attributes?.date === fullDate
              )}
              value={tabsValue}
              index={i}
            />
          );
        })}
      </>
    </Box>
  );
};

import { gql, useQuery } from '@apollo/client';

import { Tab, Tabs } from '@mui/material';
import { Box } from '@mui/system';
import React, { FC } from 'react';
import { useCurrentWeek } from '../../hooks';
import { Query } from '../../types/GraphqlTypes';
import { TabDuration } from './TabDuration';
import { TabPanel } from './TabPanel';

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
              }
            }
          }
        }
      }
    }
  }
`;

type Props = {
  tabsValue: number;
  setTabsValue: (newValue: number) => void;
  dataTabs: {
    value: number;
    project: {
      title: string;
      duraction: string;
      description: string;
    }[];
  }[];
};

export const DayTrackerTabs: FC<Props> = ({
  dataTabs,
  setTabsValue,
  tabsValue,
}) => {
  const { days, weekEnd, weekStart } = useCurrentWeek();
  const { data } = useQuery<Query>(GET_CURRENT_WEEK_TRACKERS, {
    variables: { weekStart, weekEnd },
  });
  const currentData =
    data?.usersPermissionsUser?.data?.attributes?.trackers?.data;
  return (
    <Box>
      <Box>
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
                      currentDateTracks={currentData?.filter(
                        ({ attributes }) => attributes?.date === fullDate
                      )}
                    />
                  }
                </Box>
              }
            />
          ))}
        </Tabs>
      </Box>
      <TabPanel dataTabs={dataTabs} index={0} value={tabsValue} />
      <TabPanel dataTabs={dataTabs} index={1} value={tabsValue} />
      <TabPanel dataTabs={dataTabs} index={2} value={tabsValue} />
      <TabPanel dataTabs={dataTabs} index={3} value={tabsValue} />
      <TabPanel dataTabs={dataTabs} index={4} value={tabsValue} />
      <TabPanel dataTabs={dataTabs} index={5} value={tabsValue} />
      <TabPanel dataTabs={dataTabs} index={6} value={tabsValue} />
    </Box>
  );
};

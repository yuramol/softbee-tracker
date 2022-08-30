import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { format, endOfMonth, startOfMonth } from 'date-fns';
import {
  List,
  ListItem,
  ListItemText,
  ButtonGroup,
  Button,
  Divider,
  Typography,
  Tooltip,
} from '@mui/material';

import { useAuthUser, useCurrentWeek } from 'hooks';
import { getTotalTime } from 'helpers';
import { PROJECTS_TRACKERS_BY_USER_ID_QUERY } from 'api';
import {
  ProjectEntityResponseCollection,
  TrackerEntity,
} from 'types/GraphqlTypes';

export const TimeInspector = () => {
  const { user } = useAuthUser();
  const { weekStart, weekEnd, days, currentDay } = useCurrentWeek(new Date());
  const inspectionTypes = [
    {
      label: 'Day',
      value: 'day',
      limit: 5,
      filter: [days[currentDay].fullDate, days[currentDay].fullDate],
    },
    {
      label: 'Week',
      value: 'week',
      limit: 25,
      filter: [weekStart, weekEnd],
    },
    {
      label: 'Month',
      value: 'month',
      limit: 110,
      filter: [
        format(startOfMonth(new Date(days[currentDay].fullDate)), 'yyyy-MM-dd'),
        format(endOfMonth(new Date(days[currentDay].fullDate)), 'yyyy-MM-dd'),
      ],
    },
  ];
  const [inspectBy, setInspectBy] = useState(inspectionTypes[0]);

  const { data } = useQuery<{
    projects: ProjectEntityResponseCollection;
  }>(PROJECTS_TRACKERS_BY_USER_ID_QUERY, {
    variables: {
      userId: user.id,
      startDate: inspectBy.filter[0],
      endDate: inspectBy.filter[1],
    },
  });

  const handleClickButton = (index: number) => {
    setInspectBy(inspectionTypes[index]);
  };

  const projects = data?.projects.data;
  const trackers = projects
    ?.map(({ attributes }) => attributes?.trackers?.data)
    .flat();
  const totalTime = getTotalTime(trackers as TrackerEntity[]);

  return (
    <>
      <ButtonGroup size="small" fullWidth>
        {inspectionTypes.map(({ label, value }, i) => (
          <Button
            key={value}
            variant={inspectBy.value === value ? 'contained' : 'outlined'}
            onClick={() => handleClickButton(i)}
          >
            {label}
          </Button>
        ))}
      </ButtonGroup>
      <List disablePadding sx={{ my: 4 }}>
        {(projects?.length as number) > 0 ? (
          projects?.map(({ id, attributes }) => (
            <ListItem key={id} disableGutters disablePadding>
              <ListItemText primary={attributes?.name} />
              <ListItemText
                sx={{ ml: 2, display: 'contents' }}
                primary={getTotalTime(attributes?.trackers?.data)}
              />
            </ListItem>
          ))
        ) : (
          <ListItem disableGutters disablePadding>
            <ListItemText primary="You are not attached to any project" />
          </ListItem>
        )}
        <Divider sx={{ my: 2 }} />
        <ListItem disableGutters disablePadding>
          <ListItemText
            primary={<Typography fontWeight={600}>Total time:</Typography>}
          />
          <ListItemText
            sx={{ ml: 2, display: 'contents' }}
            primary={
              <Tooltip title={`${totalTime} from ${inspectBy.limit} hours`}>
                <Typography fontWeight={600}>{`${totalTime.split(':')[0]} / ${
                  inspectBy.limit
                }`}</Typography>
              </Tooltip>
            }
          />
        </ListItem>
      </List>
    </>
  );
};

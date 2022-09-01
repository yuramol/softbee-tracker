import React, { useEffect, useRef, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { format, endOfMonth, startOfMonth } from 'date-fns';
import {
  List,
  ListItem,
  ListItemText,
  ButtonGroup,
  Button,
  Divider,
  Typography,
} from '@mui/material';

import { useAuthUser, useCurrentWeek } from 'hooks';
import { getTotalTime } from 'helpers';
import { PROJECTS_TRACKERS_BY_USER_ID_QUERY } from 'api';
import {
  ProjectEntity,
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

  const projectsData = useRef<ProjectEntity[] | undefined>([]);
  const [inspectBy, setInspectBy] = useState(inspectionTypes[0]);
  const [projects, setProjects] = useState<ProjectEntity[] | undefined>([]);

  const [loadProjects, { data }] = useLazyQuery<{
    projects: ProjectEntityResponseCollection;
  }>(PROJECTS_TRACKERS_BY_USER_ID_QUERY, {
    variables: {
      userId: user.id,
      startDate: inspectBy.filter[0],
      endDate: inspectBy.filter[1],
    },
  });

  useEffect(() => {
    loadProjects().then(({ data }) => {
      projectsData.current = data?.projects.data;
      setProjects([...(projectsData.current as ProjectEntity[])]);
    });
  }, [data]);

  const trackers = projects
    ?.map(({ attributes }) => attributes?.trackers?.data)
    .flat();
  const totalTime = getTotalTime(trackers as TrackerEntity[]);

  const handleClickButton = (index: number) => {
    setInspectBy(inspectionTypes[index]);
  };

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
        {(projectsData.current?.length as number) > 0 ? (
          projectsData.current?.map(({ id, attributes }) => (
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
              <Typography
                fontWeight={600}
              >{`${totalTime} / ${inspectBy.limit}`}</Typography>
            }
          />
        </ListItem>
      </List>
    </>
  );
};

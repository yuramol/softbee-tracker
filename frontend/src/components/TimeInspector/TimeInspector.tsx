import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  endOfMonth,
  startOfMonth,
  eachWeekendOfMonth,
  getDaysInMonth,
} from 'date-fns';
import {
  List,
  ListItem,
  ListItemText,
  ButtonGroup,
  Button,
  Divider,
  Typography,
} from '@mui/material';

import { Breaks } from 'constant';
import { getFormattedDate } from 'helpers';
import { useAuthUser, useCurrentWeek, useProjects } from 'hooks';

type TimeInspectorProps = {
  userId?: string;
};

export const TimeInspector = ({ userId }: TimeInspectorProps) => {
  const { weekStart, weekEnd, days, currentDay } = useCurrentWeek(new Date());
  const { isManager } = useAuthUser();

  const location = useLocation();

  const HOURS_PER_DAY = 5;
  const DAYS_PER_WEEK = 5;
  const DAYS_PER_MONTH =
    getDaysInMonth(new Date()) - eachWeekendOfMonth(new Date()).length;

  const inspectionTypes = [
    {
      label: 'Day',
      value: 'day',
      limit: HOURS_PER_DAY,
      filter: [days[currentDay].fullDate, days[currentDay].fullDate],
    },
    {
      label: 'Week',
      value: 'week',
      limit: DAYS_PER_WEEK * HOURS_PER_DAY,
      filter: [weekStart, weekEnd],
    },
    {
      label: 'Month',
      value: 'month',
      limit: DAYS_PER_MONTH * HOURS_PER_DAY,
      filter: [
        getFormattedDate(startOfMonth(new Date(days[currentDay].fullDate))),
        getFormattedDate(endOfMonth(new Date(days[currentDay].fullDate))),
      ],
    },
  ];

  const [inspectBy, setInspectBy] = useState(inspectionTypes[0]);
  const { totalByProjects, total } = useProjects(
    {
      users: { id: { eq: userId } },
      status: { eq: 'active' },
    },
    {
      user: { id: { eq: userId } },
      date: { between: inspectBy.filter },
      or: [{ status: { eq: null } }, { status: { eq: 'approved' } }],
    }
  );

  const vacationTime = totalByProjects
    ?.filter(
      (item) =>
        item.name?.toLowerCase() === Breaks.Vacation ||
        item.name?.toLowerCase() === Breaks.Sickness ||
        item.name?.toLowerCase() === Breaks.Unpaid
    )
    .reduce(
      (acc, val) => {
        const [hoursStr, minutesStr] = val.total.split(':');
        const hours = parseInt(hoursStr, 10);
        const minutes = parseInt(minutesStr, 10);

        acc.hours += hours;
        acc.minutes += minutes;

        if (acc.minutes >= 60) {
          acc.hours += Math.floor(acc.minutes / 60);
          acc.minutes %= 60;
        }

        return acc;
      },
      { hours: 0, minutes: 0 }
    );

  const projects = totalByProjects?.filter(
    (item) =>
      item.name?.toLowerCase() !== Breaks.Vacation &&
      item.name?.toLowerCase() !== Breaks.Sickness &&
      item.name?.toLowerCase() !== Breaks.Unpaid
  );

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
        {projects?.length > 0 ? (
          projects?.map(({ name, total }) => (
            <ListItem key={name} disableGutters disablePadding>
              <ListItemText
                primaryTypographyProps={{
                  style: {
                    paddingRight: '100px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  },
                }}
                primary={name}
              />
              <ListItemText
                sx={{ ml: 2, display: 'contents' }}
                primary={total}
              />
            </ListItem>
          ))
        ) : (
          <ListItem disableGutters disablePadding>
            <ListItemText primary="You are not attached to any project" />
          </ListItem>
        )}
        <ListItem disableGutters disablePadding>
          <ListItemText
            primaryTypographyProps={{
              style: {
                paddingRight: '100px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              },
            }}
            primary="Vacation"
          />
          <ListItemText
            sx={{ ml: 2, display: 'contents' }}
            primary={`${vacationTime.hours}:${
              vacationTime.minutes < 10
                ? `0${vacationTime.minutes}`
                : vacationTime.minutes
            }`}
          />
        </ListItem>
        <Divider sx={{ my: 2 }} />
        <ListItem disableGutters disablePadding>
          <ListItemText
            primary={<Typography fontWeight={600}>Total time:</Typography>}
          />
          <ListItemText
            sx={{ ml: 2, display: 'contents' }}
            primary={
              location.pathname === '/crew' && isManager ? (
                <Typography fontWeight={600}>{`${total} `}</Typography>
              ) : (
                <Typography
                  fontWeight={600}
                >{`${total} / ${inspectBy.limit}`}</Typography>
              )
            }
          />
        </ListItem>
      </List>
    </>
  );
};

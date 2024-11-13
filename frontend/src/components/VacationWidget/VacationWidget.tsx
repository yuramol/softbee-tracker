import React, { useEffect } from 'react';
import { endOfYear, format, startOfYear } from 'date-fns';
import { List, ListItem, ListItemText, Stack, Typography } from '@mui/material';

import { Icon } from 'legos';
import { Breaks } from 'constant';
import { BreaksRequest } from 'components/BreaksRequest';
import { Enum_Tracker_Status } from 'types/GraphqlTypes';
import { useAuthUser, useNormalizedTrackers } from 'hooks';

export const VacationWidget = () => {
  const { user } = useAuthUser();

  const startYear = format(startOfYear(new Date()), 'YYY-MM-dd');
  const endYear = format(endOfYear(new Date()), 'YYY-MM-dd');
  const vacationProjects = ['8', '14', '16', '15'];
  const { normalizedTrackers, fetchTrackers } = useNormalizedTrackers(
    {
      user: { id: { in: [user.id] } },
      date: { between: [startYear, endYear] },
      project: {
        id: { in: vacationProjects },
      },
    },
    true
  );

  useEffect(() => {
    fetchTrackers({
      variables: {
        filters: {
          user: { id: { in: [user.id] } },
          date: { between: [startYear, endYear] },
          project: {
            id: { in: vacationProjects },
          },
        },
      },
    });
  }, [user.id]);

  let vacationDays = 0;
  let sicknessDays = 0;

  normalizedTrackers?.forEach((el) => {
    if (
      el?.trackersByProject[0].name?.toLowerCase() === Breaks.Vacation &&
      el?.trackersByProject[0].status === Enum_Tracker_Status.Approved
    ) {
      vacationDays += 1;
    }
    if (el?.trackersByProject[0].name?.toLowerCase() === Breaks.Sickness) {
      sicknessDays += 1;
    }
  });

  return (
    <>
      <Stack gap={3} mb={3}>
        <Stack gap={1}>
          <BreaksRequest />
        </Stack>

        <List disablePadding>
          <ListItem disableGutters disablePadding>
            <ListItemText
              primary={
                <Stack direction="row">
                  <Icon icon="sailing" />
                  <Typography ml={0.5} fontWeight={600}>
                    Vacations:
                  </Typography>
                </Stack>
              }
            />
            <ListItemText
              sx={{ ml: 2, display: 'contents' }}
              primary={
                <Typography
                  fontWeight={600}
                >{`${vacationDays} / 25`}</Typography>
              }
            />
          </ListItem>
          <ListItem disableGutters disablePadding>
            <ListItemText
              primary={
                <Stack direction="row">
                  <Icon icon="medicalServices" />
                  <Typography ml={0.5} fontWeight={600}>
                    Sickness:
                  </Typography>
                </Stack>
              }
            />
            <ListItemText
              sx={{ ml: 2, display: 'contents' }}
              primary={
                <Typography sx={{ verticalAlign: 'center' }} fontWeight={600}>
                  {`${sicknessDays} / 5`}
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Stack>
    </>
  );
};

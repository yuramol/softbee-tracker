import React from 'react';
import { List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { useAuthUser, useNormalizedTrackers } from 'hooks';
import { Icon } from 'legos';
import { Breaks } from 'constant';
import { BreaksRequest } from 'components/BreaksRequest';

export const VacationWidget = () => {
  const { user } = useAuthUser();
  const { normalizedTrackers } = useNormalizedTrackers({
    user: { id: { in: [user.id] } },
  });

  let vacationDays = 0;
  let sicknessDays = 0;

  normalizedTrackers?.forEach((el) => {
    if (el?.trackersByProject[0].name?.toLowerCase() === Breaks.Vacation) {
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
                  <Icon icon="houseboat" />
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
                >{`${vacationDays} / 30`}</Typography>
              }
            />
          </ListItem>
          <ListItem disableGutters disablePadding>
            <ListItemText
              primary={
                <Stack direction="row">
                  <Icon icon="medication" />
                  <Typography ml={0.5} fontWeight={600}>
                    Sick leave:
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

import React, { useState } from 'react';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { useAuthUser, useNormalizedTrackers } from 'hooks';
import { Icon } from 'legos';
import { Breaks } from 'constant';
import { VacationEntryModalForm } from './VacationEntryModalForm';

export const VacationWidget = () => {
  const { user, isManager } = useAuthUser();
  const { trackers } = useNormalizedTrackers({
    user: { id: { in: [user.id] } },
  });

  let vacationDays = 0;
  let sicknessDays = 0;

  trackers?.forEach((el) => {
    if (el?.trackersByProject[0].name?.toLowerCase() === Breaks.Vacation) {
      vacationDays += 1;
    }
    if (el?.trackersByProject[0].name?.toLowerCase() === Breaks.Sickness) {
      sicknessDays += 1;
    }
  });

  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <>
      <VacationEntryModalForm open={isOpenModal} onClose={toggleOpenModal} />
      <Stack gap={3}>
        {isManager && (
          <Button
            sx={{
              textTransform: 'none',
            }}
            variant="contained"
            onClick={toggleOpenModal}
          >
            Vacation request
          </Button>
        )}
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

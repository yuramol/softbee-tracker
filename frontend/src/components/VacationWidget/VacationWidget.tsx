import React, { useState } from 'react';
import { List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { useAuthUser, useNormalizedTrackers } from 'hooks';
import { Button, Icon } from 'legos';
import { Breaks } from 'constant';
import { VacationApproveModalForm } from './VacationApproveModalForm';

export const VacationWidget = () => {
  const { user, isManager } = useAuthUser();
  const { trackers } = useNormalizedTrackers({
    user: { id: { in: [user.id] } },
  });

  const pageLink = window.location.href.split('/');
  const isProfilePage = pageLink[pageLink.length - 1] === 'profile';

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
      <VacationApproveModalForm open={isOpenModal} onClose={toggleOpenModal} />
      <Stack gap={3} mb={3}>
        {isManager && isProfilePage && (
          <Button
            title="Vacation approve"
            variant="contained"
            onClick={toggleOpenModal}
          />
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

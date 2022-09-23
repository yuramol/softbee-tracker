import React, { useContext, useState } from 'react';
import {
  Button,
  IconButton,
  Popper,
  Typography,
  ClickAwayListener,
  Grid,
  Stack,
  Box,
  LinearProgress,
} from '@mui/material';
import { format, parseISO } from 'date-fns';

import { TimeContext } from './TrackerDayView';
import { Icon } from 'legos';
import { TimeDuration } from 'components';
import {
  TimeEntryValues,
  TrackerEntryModalForm,
} from 'components/TrackerEntryModalForm';
import { useAuthUser } from 'hooks';
import { TrackerEntity } from 'types/GraphqlTypes';
import { useStartTracker } from 'modules/LiveTracker/hooks';
import { BreaksDay } from 'components';
import { breaksTitles } from 'constant';

type TrackerItemProps = {
  tracker: TrackerEntity;
};

export const TrackerItem = ({ tracker }: TrackerItemProps) => {
  const { user } = useAuthUser();
  const { onUpdateTracker, onDeleteTracker } = useContext(TimeContext);
  const { startTracker } = useStartTracker();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleChange = (value: number, submit?: boolean) => {
    if (submit) {
      onUpdateTracker(tracker.id, {
        durationMinutes: value,
      });
    }
  };

  const toggleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleClickDeleteButton = (el: HTMLElement) => {
    setAnchorEl(el);
    setIsPopperOpen(true);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
    setIsPopperOpen(false);
  };

  const handleDelete = () => {
    handleClickAway();
    onDeleteTracker(tracker.id);
  };

  const initialValuesForm: TimeEntryValues = {
    date: parseISO(tracker.attributes?.date ?? ''),
    duration: tracker.attributes?.durationMinutes ?? 0,
    description: tracker.attributes?.description ?? '',
    project: tracker.attributes?.project?.data?.id ?? '',
  };

  const handleStartTracker = () => {
    startTracker(tracker);
  };

  const handelSubmit = (values: TimeEntryValues) => {
    onUpdateTracker(tracker.id, {
      date: format(values.date, 'yyyy-MM-dd'),
      description: values.description,
      project: values.project,
      durationMinutes: values.duration,
    });

    toggleOpenModal();
  };

  return (
    <Grid alignItems="center" borderBottom={1} borderColor="gray" py={4}>
      {breaksTitles.includes(
        tracker.attributes?.project?.data?.attributes?.name as string
      ) ? (
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <BreaksDay
              breaks={tracker.attributes?.project?.data?.attributes?.name}
              description={tracker.attributes?.description}
            />
          </Grid>
          <Grid item xs={5}>
            <TimeDuration
              disabled={true}
              sx={{ width: '110px' }}
              value={tracker.attributes?.durationMinutes ?? 0}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <Typography variant="h6">
                {tracker.attributes?.project?.data?.attributes?.name ?? ''}
              </Typography>
              <Typography>{tracker.attributes?.description}</Typography>
            </Grid>
            <Grid item container xs={5} gap={1}>
              {tracker.attributes?.live_status === 'start' ? (
                <>
                  <Typography variant="caption">live tracking ... </Typography>
                  <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                  </Box>
                </>
              ) : (
                <>
                  <TimeDuration
                    sx={{ width: '110px' }}
                    value={tracker.attributes?.durationMinutes ?? 0}
                    onChange={handleChange}
                  />
                  <IconButton
                    sx={{ width: '56px' }}
                    color="primary"
                    onClick={toggleOpenModal}
                  >
                    <Icon icon="edit" size="small" />
                  </IconButton>
                  <IconButton
                    size="large"
                    color="primary"
                    sx={{ border: '1px solid' }}
                    onClick={handleStartTracker}
                  >
                    <Icon icon="playArrow" size="inherit" />
                  </IconButton>
                  <IconButton
                    sx={{ width: '56px' }}
                    color="error"
                    onClick={(e) => handleClickDeleteButton(e.currentTarget)}
                  >
                    <Icon icon="deleteOutline" />
                  </IconButton>
                </>
              )}
            </Grid>
          </Grid>

          {isPopperOpen && (
            <ClickAwayListener onClickAway={handleClickAway}>
              <Popper open={isPopperOpen} anchorEl={anchorEl}>
                <Stack
                  bgcolor="background.paper"
                  border="1px solid"
                  borderRadius={1}
                  p={2}
                >
                  <Typography marginBottom={2}>Are you sure?</Typography>
                  <Stack direction="row" justifyContent="flex-end" gap={2}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={handleClickAway}
                    >
                      No
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={handleDelete}
                    >
                      Yes
                    </Button>
                  </Stack>
                </Stack>
              </Popper>
            </ClickAwayListener>
          )}
        </>
      )}
      <TrackerEntryModalForm
        open={isOpenModal}
        onClose={toggleOpenModal}
        onSubmit={(values) => handelSubmit(values)}
        initialValuesForm={initialValuesForm}
        titleForm="Edit time entry"
        buttonSubmitTitle="Update"
        userId={user.id}
      />
    </Grid>
  );
};

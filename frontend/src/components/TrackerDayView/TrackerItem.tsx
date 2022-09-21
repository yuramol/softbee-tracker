import React, { useContext, useState } from 'react';
import {
  Button,
  IconButton,
  Popper,
  Typography,
  ClickAwayListener,
  Grid,
  Stack,
} from '@mui/material';
import { format, parseISO } from 'date-fns';

import { TimeContext } from './TrackerDayView';
import { useCreateTracker } from 'modules';
import { Icon } from 'legos';
import TimePicker from 'components/TimePicker';
import {
  TimeEntryValues,
  TrackerEntryModalForm,
} from 'components/TrackerEntryModalForm';
import { parseTrackerTime } from 'helpers';
import { useAuthUser } from 'hooks';
import { TrackerEntity } from 'types/GraphqlTypes';
import { BreaksDay } from 'components';
import { breaksTitles } from 'constant';

type TrackerItemProps = {
  tracker: TrackerEntity;
};

export const TrackerItem = ({ tracker }: TrackerItemProps) => {
  const { user } = useAuthUser();
  const { onUpdateTracker, onDeleteTracker } = useContext(TimeContext);
  const { createTracker } = useCreateTracker();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const [time, setTime] = useState(
    parseTrackerTime(tracker.attributes?.duration ?? '')
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleChange = (value: string, submit?: boolean) => {
    setTime(parseTrackerTime(value, 'HH:mm'));
    if (submit) {
      onUpdateTracker(tracker.id, {
        duration: parseTrackerTime(value, 'HH:mm'),
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
    duration: format(
      parseTrackerTime(tracker.attributes?.duration ?? ''),
      'HH:mm'
    ),
    description: tracker.attributes?.description ?? '',
    project: tracker.attributes?.project?.data?.id ?? '',
  };

  const handleStartTracker = () => {
    createTracker(user.id, initialValuesForm);
  };

  const handelSubmit = (values: TimeEntryValues) => {
    setTime(parseTrackerTime(values.duration, 'HH:mm'));

    onUpdateTracker(tracker.id, {
      date: format(values.date, 'yyyy-MM-dd'),
      description: values.description,
      project: values.project,
      duration: parseTrackerTime(values.duration, 'HH:mm'),
    });

    toggleOpenModal();
  };

  return (
    <Grid alignItems="center" borderBottom={1} borderColor="gray" py={4}>
      {breaksTitles.includes(
        tracker.attributes?.project?.data?.attributes?.name as string
      ) ? (
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <BreaksDay
              breaks={tracker.attributes?.project?.data?.attributes?.name}
              description={tracker.attributes?.description}
            />
          </Grid>
          <Grid item xs={4}>
            <TimePicker
              disabled={true}
              width="110px"
              value={format(time, 'HH:mm')}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography variant="h6">
                {tracker.attributes?.project?.data?.attributes?.name ?? ''}
              </Typography>
              <Typography>{tracker.attributes?.description}</Typography>
            </Grid>
            <Grid item container xs={4}>
              <TimePicker
                width="110px"
                value={format(time, 'HH:mm')}
                onChange={handleChange}
              />
              <Grid>
                <IconButton color="primary" onClick={toggleOpenModal}>
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
                  color="error"
                  onClick={(e) => handleClickDeleteButton(e.currentTarget)}
                >
                  <Icon icon="deleteOutline" />
                </IconButton>
              </Grid>
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

import React, { useContext, useState } from 'react';
import {
  Button,
  IconButton,
  Popper,
  Typography,
  ClickAwayListener,
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
    DATE: parseISO(tracker.attributes?.date ?? ''),
    DURATION: format(
      parseTrackerTime(tracker.attributes?.duration ?? ''),
      'HH:mm'
    ),
    DESCRIPTION: tracker.attributes?.description ?? '',
    PROJECT: tracker.attributes?.project?.data?.id ?? '',
  };

  const handleStartTracker = () => {
    createTracker(user.id, false, initialValuesForm);
  };

  const handelSubmit = (values: TimeEntryValues) => {
    setTime(parseTrackerTime(values.DURATION, 'HH:mm'));

    onUpdateTracker(tracker.id, {
      date: format(values.DATE, 'yyyy-MM-dd'),
      description: values.DESCRIPTION,
      project: values.PROJECT,
      duration: parseTrackerTime(values.DURATION, 'HH:mm'),
    });

    toggleOpenModal();
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      gap={3}
      borderBottom={1}
      borderColor="gray"
      py={4}
    >
      <Stack>
        <Typography variant="h6">
          {tracker.attributes?.project?.data?.attributes?.name ?? ''}
        </Typography>
        <Typography>{tracker.attributes?.description}</Typography>
      </Stack>
      <Stack direction="row" alignItems="center" gap={1}>
        <TimePicker
          width="110px"
          value={format(time, 'HH:mm')}
          onChange={handleChange}
        />
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
        {isPopperOpen && (
          <ClickAwayListener onClickAway={handleClickAway}>
            <Popper open={isPopperOpen} anchorEl={anchorEl}>
              <Stack
                bgcolor="background.paper"
                border="1px solid"
                borderRadius={1}
                p={2}
              >
                <Typography marginBottom={2}>
                  Are you sure to delete this timesheet?
                </Typography>
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
      </Stack>
      <TrackerEntryModalForm
        open={isOpenModal}
        onClose={toggleOpenModal}
        onSubmit={(values) => handelSubmit(values)}
        initialValuesForm={initialValuesForm}
        titleForm="Edit time entry"
        buttonSubmitTitle="Update"
        userId={user.id}
      />
    </Stack>
  );
};

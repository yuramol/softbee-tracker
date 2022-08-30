import React, { FC, useContext, useState } from 'react';
import {
  Button,
  IconButton,
  Popper,
  Typography,
  ClickAwayListener,
  Stack,
} from '@mui/material';
import { format } from 'date-fns';

import { TimeContext } from './TrackerDayView';
import { Icon } from 'legos';
import TimePicker from 'components/TimePicker';
import {
  TimeEntryValues,
  TrackerEntryModalForm,
} from 'components/TrackerEntryModalForm';
import { parseTrackerTime } from 'helpers';
import { useAuthUser } from 'hooks';
import { Maybe } from 'types/GraphqlTypes';

type Props = {
  id?: Maybe<string>;
  name?: string;
  date: string;
  description?: string;
  duration: string;
  projectId?: Maybe<string>;
};

export const TrackerItem: FC<Props> = ({
  id,
  name,
  date,
  description,
  duration,
  projectId,
}) => {
  const { user } = useAuthUser();
  const { onUpdateTracker, onDeleteTracker } = useContext(TimeContext);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isTrackerStart, setIsTrackerStart] = useState(false);
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const [time, setTime] = useState(parseTrackerTime(duration));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleChange = (value: string, submit?: boolean) => {
    setTime(parseTrackerTime(value, 'HH:mm'));
    if (submit) {
      onUpdateTracker(id, { duration: parseTrackerTime(value, 'HH:mm') });
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
    onDeleteTracker(id);
  };

  const initialValuesForm: TimeEntryValues = {
    DATE: new Date(date),
    DURATION: format(parseTrackerTime(duration), 'HH:mm'),
    DESCRIPTION: description,
    PROJECT: projectId,
  };

  const handelSubmit = (values: TimeEntryValues) => {
    setTime(parseTrackerTime(values.DURATION, 'HH:mm'));

    onUpdateTracker(id, {
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
        <Typography variant="h6">{name}</Typography>
        <Typography>{description}</Typography>
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
          onClick={() => setIsTrackerStart(!isTrackerStart)}
        >
          {isTrackerStart ? (
            <Icon icon="pause" size="inherit" />
          ) : (
            <Icon icon="playArrow" size="inherit" />
          )}
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

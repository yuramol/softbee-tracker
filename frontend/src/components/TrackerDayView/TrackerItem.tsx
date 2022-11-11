import React, { useState } from 'react';
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

import { Icon } from 'legos';
import { TimePicker } from 'components';
import {
  TimeEntryValues,
  TrackerEntryModalForm,
} from 'components/TrackerEntryModalForm';
import { useUpdateTracker, useDeleteTracker, useNotification } from 'hooks';
import { Maybe, TrackerEntity } from 'types/GraphqlTypes';
import { useStartTracker } from 'modules/LiveTracker/hooks';
import { BreaksDay } from 'components';
import { breaksTitles } from 'constant';
import { TIME_ENTRY_FIELDS } from 'components/TrackerEntryModalForm/TrackerEntryForm';

type TrackerItemProps = {
  tracker: TrackerEntity;
  id?: Maybe<string>;
};

export const TrackerItem = ({ tracker, id }: TrackerItemProps) => {
  const { updateTracker } = useUpdateTracker();
  const { deleteTracker } = useDeleteTracker();
  const { startTracker } = useStartTracker();
  const notification = useNotification();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const initialValuesForm: TimeEntryValues = {
    [TIME_ENTRY_FIELDS.DATE]: parseISO(tracker.attributes?.date ?? ''),
    [TIME_ENTRY_FIELDS.DURATION]: tracker.attributes?.durationMinutes ?? 0,
    [TIME_ENTRY_FIELDS.DESCRIPTION]: tracker.attributes?.description ?? '',
    [TIME_ENTRY_FIELDS.PROJECT]: tracker.attributes?.project?.data?.id ?? '',
  };

  const toggleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleStartTracker = () => {
    startTracker(tracker);
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
    if (tracker?.id) {
      deleteTracker(tracker.id).then(() => {
        notification({
          message: 'The tracker was successfully deleted',
          variant: 'warning',
        });
      });
    }
  };

  const handelSubmit = (values: TimeEntryValues) => {
    const data = {
      ...values,
      date: format(values.date, 'yyyy-MM-dd'),
    };
    if (tracker?.id) {
      updateTracker(tracker.id, data).then(() => {
        notification({
          message: 'The tracker was successfully updated',
          variant: 'success',
        });
      });
    }
    toggleOpenModal();
  };

  const handleChange = (value: number, submit?: boolean) => {
    if (submit && tracker?.id) {
      updateTracker(tracker.id, {
        durationMinutes: value,
      }).then(() => {
        notification({
          message: 'The tracker was successfully updated',
          variant: 'success',
        });
      });
    }
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
            <TimePicker
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
                  <TimePicker
                    sx={{ width: '110px' }}
                    value={tracker.attributes?.durationMinutes ?? 0}
                    onChange={handleChange}
                    id={id}
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
      />
    </Grid>
  );
};

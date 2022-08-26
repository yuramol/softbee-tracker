import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import AddIcon from '@mui/icons-material/Add';
import { GraphQLError } from 'graphql';

import {
  TimeEntryValues,
  TrackerEntryModalForm,
} from 'components/TrackerEntryModalForm';

import { useCreateTracker } from '../../hooks';
import { IconButton, Paper } from '@mui/material';

type AddTrackerProps = {
  userId: string;
};

export const AddTracker = ({ userId }: AddTrackerProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { createTracker } = useCreateTracker();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };
  const handelSubmit = (values: TimeEntryValues) => {
    createTracker(userId, values)
      .then(() => {
        enqueueSnackbar(`the countdown has started`, { variant: 'success' });
        toggleOpenModal();
      })
      .catch((error: GraphQLError) => {
        enqueueSnackbar(error.message, { variant: 'error' });
      });
  };
  return (
    <>
      <TrackerEntryModalForm
        isLive
        open={isOpenModal}
        onClose={toggleOpenModal}
        onSubmit={(values) => handelSubmit(values)}
        titleForm="New live time entry"
        userId={userId}
        buttonSubmitTitle="Start"
      />
      <Paper>
        <IconButton
          sx={{ borderRadius: 0, height: '2rem', width: '2rem' }}
          onClick={toggleOpenModal}
        >
          <AddIcon color="primary" />
        </IconButton>
      </Paper>
    </>
  );
};

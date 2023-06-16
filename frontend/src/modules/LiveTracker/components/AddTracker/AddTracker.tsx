import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import AddIcon from '@mui/icons-material/Add';
import { GraphQLError } from 'graphql';
import { Paper } from '@mui/material';

import {
  TimeEntryValues,
  TrackerEntryModalForm,
} from 'components/TrackerEntryModalForm';

import { useCreateTracker } from '../../hooks';
import { IconButtonTracker } from '../../helpers';
import {
  Enum_Tracker_Live_Status,
  TrackerEntityResponseCollection,
  TrackerFiltersInput,
} from 'types/GraphqlTypes';
import { TRACKERS_QUERY } from 'api';
import { useQuery } from '@apollo/client';

type AddTrackerProps = {
  userId: string;
};

export const AddTracker = ({ userId }: AddTrackerProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { createTracker } = useCreateTracker();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { data } = useQuery<
    {
      trackers: TrackerEntityResponseCollection;
    },
    {
      filters: TrackerFiltersInput;
    }
  >(TRACKERS_QUERY, {
    variables: {
      filters: {
        user: { id: { eq: userId } },
        live: { eq: true },
        live_status: { not: { eq: Enum_Tracker_Live_Status.Finish } },
      },
    },
    skip: !userId,
  });
  const trackers = data?.trackers.data;

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
      <Paper
        sx={{
          boxShadow: '0px 0px 23px 1px rgba(120,120,120,0.75)',
        }}
      >
        {trackers?.length === 0 ? (
          <IconButtonTracker onClick={toggleOpenModal}>
            <AddIcon color="primary" />
          </IconButtonTracker>
        ) : null}
      </Paper>
    </>
  );
};

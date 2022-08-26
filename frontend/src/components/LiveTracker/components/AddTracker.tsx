import React, { useState } from 'react';
import { format, formatISO } from 'date-fns';
import { useSnackbar } from 'notistack';

import {
  TimeEntryValues,
  TrackerEntryModalForm,
} from 'components/TrackerEntryModalForm';
import { Enum_Tracker_Livestatus } from 'types/GraphqlTypes';

import { ButtonAdd } from './ButtonAdd';
import { GraphQLError } from 'graphql';
import { useCreateTracker } from '../hooks';

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
    createTracker({
      user: userId,
      date: format(new Date(), 'yyyy-MM-dd'),
      project: values.PROJECT,
      description: values.DESCRIPTION,
      live: true,
      liveStatus: Enum_Tracker_Livestatus.Start,
      startLiveDate: formatISO(new Date()),
      duration: '00:00:00',
    })
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
      />
      <ButtonAdd onClick={toggleOpenModal} />
    </>
  );
};

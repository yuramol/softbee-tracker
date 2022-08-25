import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { format, formatISO } from 'date-fns';
import { useSnackbar } from 'notistack';

import { CREATE_TRACKER_BY_USER_ID_MUTATION } from 'api';
import {
  TimeEntryValues,
  TrackerEntryModalForm,
} from 'components/TrackerEntryModalForm';
import {
  Enum_Tracker_Livestatus,
  MutationCreateTrackerArgs,
  TrackerEntityResponse,
} from 'types/GraphqlTypes';

import { ButtonAdd } from './ButtonAdd';
import { GraphQLError } from 'graphql';

type AddTrackerProps = {
  userId: string;
};

export const AddTracker = ({ userId }: AddTrackerProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const [createTracker] = useMutation<
    TrackerEntityResponse,
    MutationCreateTrackerArgs
  >(CREATE_TRACKER_BY_USER_ID_MUTATION);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };
  const handelSubmit = (values: TimeEntryValues) => {
    createTracker({
      variables: {
        data: {
          user: userId,
          date: format(new Date(), 'yyyy-MM-dd'),
          project: values.PROJECT,
          description: values.DESCRIPTION,
          live: true,
          liveStatus: Enum_Tracker_Livestatus.Start,
          startLiveDate: formatISO(new Date()),
          // duration: '00:01:30.500',
        },
      },
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

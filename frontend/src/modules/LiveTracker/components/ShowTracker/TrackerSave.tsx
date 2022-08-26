import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useSnackbar } from 'notistack';
import { GraphQLError } from 'graphql';

import { Enum_Tracker_Live_Status, TrackerEntity } from 'types/GraphqlTypes';
import { TrackerEntryModalForm } from 'components';
import {
  FIELD_TIME_ENTRY,
  TimeEntryValues,
} from 'components/TrackerEntryModalForm/TrackerEntryForm';

import { useSaveTracker } from '../../hooks';
import { intervalDateSeconds, secondsToHms } from 'modules/LiveTracker/helpers';
import { parseISO, subMinutes } from 'date-fns';

type TrackerSaveProps = {
  tracker: TrackerEntity;
  userId: string;
};

export const TrackerSave = ({ tracker, userId }: TrackerSaveProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { saveTracker } = useSaveTracker();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const toggleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  if (!tracker.attributes) return null;

  const duration = () => {
    let startDate = new Date();
    if (tracker?.attributes?.live_status === Enum_Tracker_Live_Status.Start) {
      startDate = parseISO(tracker.attributes?.startLiveDate);
    }
    if (tracker?.attributes?.live_status === Enum_Tracker_Live_Status.Pause) {
      startDate = subMinutes(
        new Date(),
        tracker.attributes?.liveDurationMinutes
      );
    }
    const seconds = intervalDateSeconds({ endDate: startDate });
    const { hours, minutes } = secondsToHms(seconds);
    return `${hours}:${minutes}`;
  };

  const handelSubmitSaveTracker = (values: TimeEntryValues) => {
    saveTracker(tracker.id ?? '', values)
      .then(() => {
        toggleOpenModal();
        enqueueSnackbar(`Tracker save`, { variant: 'success' });
      })
      .catch((error: GraphQLError) => {
        enqueueSnackbar(error.message, { variant: 'error' });
      });
  };

  return (
    <>
      <TrackerEntryModalForm
        open={isOpenModal}
        onClose={toggleOpenModal}
        onSubmit={handelSubmitSaveTracker}
        titleForm="New live time entry"
        userId={userId}
        initialValuesForm={{
          [FIELD_TIME_ENTRY.DATE]: new Date(),
          [FIELD_TIME_ENTRY.DURATION]: duration(),
          [FIELD_TIME_ENTRY.DESCRIPTION]: tracker.attributes.description,
          [FIELD_TIME_ENTRY.PROJECT]:
            tracker.attributes.project?.data?.id ?? '',
        }}
      />

      <IconButton
        onClick={toggleOpenModal}
        sx={{ borderRadius: 0, height: '2rem', width: '2rem' }}
      >
        <SaveIcon color="primary" />
      </IconButton>
    </>
  );
};

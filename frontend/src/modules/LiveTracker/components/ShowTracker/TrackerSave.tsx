import React, { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { useSnackbar } from 'notistack';
import { GraphQLError } from 'graphql';
import { parseISO, subMinutes } from 'date-fns';

import { Enum_Tracker_Live_Status, TrackerEntity } from 'types/GraphqlTypes';
import { TrackerEntryModalForm } from 'components';
import { TIME_ENTRY_FIELDS } from 'components/TrackerEntryModalForm/TrackerEntryForm';

import { useSaveTracker } from '../../hooks';
import {
  intervalDateSeconds,
  secondsToHms,
  IconButtonTracker,
} from '../../helpers';
import { TimeEntryValues } from 'components/TrackerEntryModalForm';

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
        enqueueSnackbar(`Track saved`, { variant: 'success' });
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
          [TIME_ENTRY_FIELDS.DATE]: new Date(),
          [TIME_ENTRY_FIELDS.DURATION]: duration(),
          [TIME_ENTRY_FIELDS.DESCRIPTION]: tracker.attributes.description,
          [TIME_ENTRY_FIELDS.PROJECT]:
            tracker.attributes.project?.data?.id ?? '',
        }}
      />

      <IconButtonTracker onClick={toggleOpenModal}>
        <CheckIcon color="primary" />
      </IconButtonTracker>
    </>
  );
};

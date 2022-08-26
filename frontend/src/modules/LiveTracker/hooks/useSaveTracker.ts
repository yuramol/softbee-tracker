import { useMutation } from '@apollo/client';

import { TRACKERS_LIVE_QUERY, UPDATE_TRACKER_BY_ID_MUTATION } from 'api';
import {
  Enum_Tracker_Live_Status,
  MutationUpdateTrackerArgs,
  TrackerEntityResponse,
} from 'types/GraphqlTypes';

import { TimeEntryValues } from 'components/TrackerEntryModalForm';
import { format } from 'date-fns';
import { parseTrackerTime } from 'helpers';

const useSaveTracker = () => {
  const [save] = useMutation<TrackerEntityResponse, MutationUpdateTrackerArgs>(
    UPDATE_TRACKER_BY_ID_MUTATION
  );

  const saveTracker = (trackerId: string, values: TimeEntryValues) => {
    return save({
      variables: {
        id: trackerId,
        data: {
          live: false,
          live_status: Enum_Tracker_Live_Status.Finish,
          startLiveDate: null,
          liveDurationMinutes: null,

          date: format(values.DATE, 'yyyy-MM-dd'),
          duration: format(
            parseTrackerTime(values.DURATION, 'HH:mm'),
            'HH:mm:ss.SSS'
          ),
          description: values.DESCRIPTION,
        },
      },
      refetchQueries: [TRACKERS_LIVE_QUERY],
    });
  };
  return { saveTracker };
};

export { useSaveTracker };

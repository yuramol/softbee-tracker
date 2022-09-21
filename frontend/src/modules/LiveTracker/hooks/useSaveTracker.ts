import { useMutation } from '@apollo/client';

import { TRACKERS_QUERY, UPDATE_TRACKER_BY_ID_MUTATION } from 'api';
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
    console.log('debug > values===', values);
    return save({
      variables: {
        id: trackerId,
        data: {
          live: false,
          live_status: Enum_Tracker_Live_Status.Finish,
          startLiveDate: null,
          liveDurationMinutes: null,
          date: values.date,
          duration: format(
            parseTrackerTime(values.duration, 'HH:mm'),
            'HH:mm:ss.SSS'
          ),
          description: values.description,
        },
      },
      refetchQueries: [TRACKERS_QUERY],
    });
  };
  return { saveTracker };
};

export { useSaveTracker };

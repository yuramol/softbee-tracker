import { useMutation } from '@apollo/client';
import { parseISO, secondsToMinutes } from 'date-fns';

import { TRACKERS_LIVE_QUERY, UPDATE_TRACKER_BY_ID_MUTATION } from 'api';
import {
  Enum_Tracker_Live_Status,
  MutationUpdateTrackerArgs,
  TrackerEntity,
  TrackerEntityResponse,
} from 'types/GraphqlTypes';

import { intervalDateSeconds } from '../helpers';

const usePauseTracker = () => {
  const [pause] = useMutation<TrackerEntityResponse, MutationUpdateTrackerArgs>(
    UPDATE_TRACKER_BY_ID_MUTATION
  );

  const pauseTracker = (tracker: TrackerEntity) => {
    const seconds = intervalDateSeconds({
      endDate: parseISO(tracker.attributes?.startLiveDate),
    });
    return pause({
      variables: {
        id: tracker.id as string,
        data: {
          live: true,
          live_status: Enum_Tracker_Live_Status.Pause,
          startLiveDate: null,
          liveDurationMinutes: secondsToMinutes(seconds),
        },
      },
      refetchQueries: [TRACKERS_LIVE_QUERY],
    });
  };
  return { pauseTracker };
};

export { usePauseTracker };

import { useMutation } from '@apollo/client';
import { formatISO } from 'date-fns';

import { TRACKERS_LIVE_QUERY, UPDATE_TRACKER_BY_ID_MUTATION } from 'api';

import {
  Enum_Tracker_Livestatus,
  MutationUpdateTrackerArgs,
  TrackerEntity,
  TrackerEntityResponse,
} from 'types/GraphqlTypes';

const useStartTracker = () => {
  const [start] = useMutation<TrackerEntityResponse, MutationUpdateTrackerArgs>(
    UPDATE_TRACKER_BY_ID_MUTATION
  );

  const startTracker = (tracker: TrackerEntity) => {
    return start({
      variables: {
        id: tracker.id as string,
        data: {
          live: true,
          liveStatus: Enum_Tracker_Livestatus.Start,
          startLiveDate: formatISO(new Date()),
        },
      },
      refetchQueries: [TRACKERS_LIVE_QUERY],
    });
  };
  return { startTracker };
};

export { useStartTracker };

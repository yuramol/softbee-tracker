import { useMutation } from '@apollo/client';
import { format, subMinutes } from 'date-fns';

import { TRACKERS_QUERY, UPDATE_TRACKER_BY_ID_MUTATION } from 'api';
import {
  Enum_Tracker_Live_Status,
  MutationUpdateTrackerArgs,
  TrackerEntity,
  TrackerEntityResponse,
} from 'types/GraphqlTypes';
import { parseTrackerTime } from 'helpers';

const useStartTracker = () => {
  const [start] = useMutation<TrackerEntityResponse, MutationUpdateTrackerArgs>(
    UPDATE_TRACKER_BY_ID_MUTATION
  );
  const startTracker = (tracker: TrackerEntity) => {
    const minutes =
      +format(parseTrackerTime(tracker.attributes?.duration), 'HH') * 60 +
      +format(parseTrackerTime(tracker.attributes?.duration), 'mm');

    return start({
      variables: {
        id: tracker.id as string,
        data: {
          live: true,
          live_status: Enum_Tracker_Live_Status.Start,
          startLiveDate: subMinutes(
            new Date(),
            tracker.attributes?.live
              ? tracker.attributes?.liveDurationMinutes
              : tracker.attributes?.liveDurationMinutes + minutes
          ),
          liveDurationMinutes: null,
        },
      },
      refetchQueries: [TRACKERS_QUERY],
    });
  };
  return { startTracker };
};

export { useStartTracker };

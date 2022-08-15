import { useQuery } from '@apollo/client';

import { TRECKERS_BY_USER_ID_QUERY } from 'api';
import { getHours, getMinutes } from 'helpers';
import {
  Scalars,
  TrackerEntity,
  TrackerEntityResponseCollection,
} from 'types/GraphqlTypes';

type TrackerByProject = {
  name: string | undefined;
  trackers: TrackerEntity[];
  total: string;
};

type TrackerByDay = {
  date: string;
  trackersByProject: TrackerByProject[];
  total: string;
};

export const useNormalizedTrackers = (
  userId: Scalars['ID'],
  startDate: Scalars['Date'],
  endDate: Scalars['Date']
) => {
  const { data, loading, refetch } = useQuery<{
    trackers: TrackerEntityResponseCollection;
  }>(TRECKERS_BY_USER_ID_QUERY, {
    variables: { userId, startDate, endDate },
  });

  const trackers: TrackerByDay[] = [];

  data?.trackers.data.forEach((tracker) => {
    const date = tracker.attributes?.date;
    const projectName = tracker.attributes?.project?.data?.attributes?.name;

    const trackerByProject: TrackerByProject = {
      name: projectName,
      trackers: [tracker],
      total: getHours(getMinutes(tracker.attributes?.duration)),
    };

    const trackerByDay: TrackerByDay = {
      date,
      trackersByProject: [trackerByProject],
      total: getHours(getMinutes(tracker.attributes?.duration)),
    };

    const findTrackerByDay = trackers.find((tracker) => tracker.date === date);

    if (findTrackerByDay) {
      const findTrackerByProject = findTrackerByDay.trackersByProject.find(
        ({ name }) => name === projectName
      );

      findTrackerByDay.total = getHours(
        getMinutes(findTrackerByDay.total, 'HH:mm') +
          getMinutes(tracker.attributes?.duration)
      );

      if (findTrackerByProject) {
        findTrackerByProject.trackers.push(tracker);
        findTrackerByProject.total = getHours(
          getMinutes(findTrackerByProject.total, 'HH:mm') +
            getMinutes(tracker.attributes?.duration)
        );
      } else {
        findTrackerByDay.trackersByProject.push(trackerByProject);
      }
    } else {
      trackers.push(trackerByDay);
    }
  });

  return { trackers, loading, refetch };
};
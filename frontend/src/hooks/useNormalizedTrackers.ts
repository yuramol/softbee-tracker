import { useQuery } from '@apollo/client';

import { TRACKERS_QUERY } from 'api';
import { getHours, getMinutes } from 'helpers';
import {
  TrackerEntity,
  TrackerEntityResponseCollection,
  TrackerFiltersInput,
} from 'types/GraphqlTypes';

type TrackerByProject = {
  name: string | undefined;
  trackers: TrackerEntity[];
  total: string;
};

export type TrackerByDay = {
  date: string;
  trackersByProject: TrackerByProject[];
  total: string;
};

export const useNormalizedTrackers = (filters: TrackerFiltersInput) => {
  const { data, loading, refetch } = useQuery<{
    trackers: TrackerEntityResponseCollection;
  }>(TRACKERS_QUERY, {
    variables: { filters },
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

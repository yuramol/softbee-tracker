import { useQuery } from '@apollo/client';

import { TRACKERS_QUERY } from 'api';
import { getMinutes } from 'helpers';
import {
  TrackerEntity,
  TrackerEntityResponseCollection,
  TrackerFiltersInput,
} from 'types/GraphqlTypes';

type TrackerByProject = {
  name: string | undefined;
  trackers: TrackerEntity[];
  total: number;
};

export type TrackerByDay = {
  date: string;
  trackersByProject: TrackerByProject[];
  total: number;
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
      total: getMinutes(tracker.attributes?.duration),
    };

    const trackerByDay: TrackerByDay = {
      date,
      trackersByProject: [trackerByProject],
      total: getMinutes(tracker.attributes?.duration),
    };

    const findTrackerByDay = trackers.find((tracker) => tracker.date === date);

    if (findTrackerByDay) {
      const findTrackerByProject = findTrackerByDay.trackersByProject.find(
        ({ name }) => name === projectName
      );

      findTrackerByDay.total =
        findTrackerByDay.total + getMinutes(tracker.attributes?.duration);

      if (findTrackerByProject) {
        findTrackerByProject.trackers.push(tracker);
        findTrackerByProject.total =
          findTrackerByProject.total + getMinutes(tracker.attributes?.duration);
      } else {
        findTrackerByDay.trackersByProject.push(trackerByProject);
      }
    } else {
      trackers.push(trackerByDay);
    }
  });

  return { trackers, loading, refetch };
};

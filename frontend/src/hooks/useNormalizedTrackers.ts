import { useLazyQuery } from '@apollo/client';

import { TRACKERS_QUERY } from 'api';
import { useEffect } from 'react';
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

export const useNormalizedTrackers = (
  filters: TrackerFiltersInput,
  lazy?: boolean
) => {
  const [fetchTrackers, { data, loading, refetch }] = useLazyQuery<{
    trackers: TrackerEntityResponseCollection;
  }>(TRACKERS_QUERY);

  useEffect(() => {
    if (!lazy) {
      fetchTrackers({
        variables: { filters },
      });
    }
  }, []);
  const normalizedTrackers: TrackerByDay[] = [];

  data?.trackers.data.forEach((tracker) => {
    const date = tracker.attributes?.date;
    const projectName = tracker.attributes?.project?.data?.attributes?.name;

    const trackerByProject: TrackerByProject = {
      name: projectName,
      trackers: [tracker],
      total: tracker.attributes?.durationMinutes ?? 0,
    };

    const trackerByDay: TrackerByDay = {
      date,
      trackersByProject: [trackerByProject],
      total: tracker.attributes?.durationMinutes ?? 0,
    };

    const findTrackerByDay = normalizedTrackers.find(
      (tracker) => tracker.date === date
    );

    if (findTrackerByDay) {
      const findTrackerByProject = findTrackerByDay.trackersByProject.find(
        ({ name }) => name === projectName
      );

      findTrackerByDay.total =
        findTrackerByDay.total + tracker.attributes?.durationMinutes ?? 0;

      if (findTrackerByProject) {
        findTrackerByProject.trackers.push(tracker);
        findTrackerByProject.total =
          findTrackerByProject.total + tracker.attributes?.durationMinutes ?? 0;
      } else {
        findTrackerByDay.trackersByProject.push(trackerByProject);
      }
    } else {
      normalizedTrackers.push(trackerByDay);
    }
  });

  return {
    trackers: data?.trackers.data,
    normalizedTrackers,
    loading,
    refetch,
    fetchTrackers,
  };
};

import { useLazyQuery } from '@apollo/client';

import { TRACKERS_QUERY } from 'api';
import { useEffect } from 'react';
import {
  Enum_Tracker_Live_Status,
  Enum_Tracker_Status,
  TrackerEntity,
  TrackerEntityResponseCollection,
  TrackerFiltersInput,
} from 'types/GraphqlTypes';

type TrackerByProject = {
  name: string | undefined;
  trackers: TrackerEntity[];
  total: number;
  status: string;
  live: Enum_Tracker_Live_Status;
  id?: string;
};

export type TrackerByDay = {
  date: string;
  trackersByProject: TrackerByProject[];
  total: number;
  status: string;
  live: string;
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
      status: tracker.attributes?.status ?? '',
      live: tracker.attributes?.live_status || Enum_Tracker_Live_Status.Finish,
      id: tracker.id || undefined,
    };

    const trackerByDay: TrackerByDay = {
      date,
      trackersByProject: [trackerByProject],
      total: tracker.attributes?.durationMinutes ?? 0,
      status: tracker.attributes?.status ?? '',
      live: tracker.attributes?.live_status || Enum_Tracker_Live_Status.Finish,
    };

    const findTrackerByDay = normalizedTrackers.find(
      (tracker) => tracker.date === date
    );

    if (findTrackerByDay) {
      const findTrackerByProject = findTrackerByDay.trackersByProject.find(
        ({ name }) => name === projectName
      );

      findTrackerByDay.total =
        tracker.attributes?.status !== Enum_Tracker_Status.New &&
        tracker.attributes?.status !== Enum_Tracker_Status.Rejected
          ? findTrackerByDay.total + tracker.attributes?.durationMinutes ?? 0
          : findTrackerByDay.total;

      if (findTrackerByProject) {
        findTrackerByProject.trackers.push(tracker);
        findTrackerByProject.total =
          tracker.attributes?.status !== Enum_Tracker_Status.New &&
          tracker.attributes?.status !== Enum_Tracker_Status.Rejected
            ? findTrackerByProject.total +
                tracker.attributes?.durationMinutes ?? 0
            : findTrackerByProject.total;
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

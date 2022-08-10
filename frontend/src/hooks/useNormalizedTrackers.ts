import { useQuery } from '@apollo/client';

import { TRECKERS_BY_USER_ID_QUERY } from 'api';
import { format, hoursToMinutes, minutesToHours } from 'date-fns';
import { parseTrackerTime } from 'helpers';
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

const getMinutes = (time: string, f?: string) =>
  hoursToMinutes(+format(parseTrackerTime(time, f), 'HH')) +
  +format(parseTrackerTime(time, f), 'mm');

const getHours = (minutes: number) => {
  const hours = minutesToHours(minutes);
  const mm = minutes - hours * 60;

  return `${hours}:${mm < 10 ? `0${mm}` : mm}`;
};

export const useNormalizedTrackers = (
  userId: Scalars['ID'],
  period: Array<Scalars['Date']>
) => {
  const { data } = useQuery<{
    trackers: TrackerEntityResponseCollection;
  }>(TRECKERS_BY_USER_ID_QUERY, {
    fetchPolicy: 'network-only',
    variables: { userId, period },
  });

  return data?.trackers.data.reduce((trackers, tracker) => {
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

    return trackers;
  }, [] as TrackerByDay[]);
};

// const normalizedTrackers = [
//   {
//     day: 'data',
//     trackersByProject: [
//       {
//         projectName: 'name',
//         trackers: [],
//         totalByProject: 'number',
//       },
//     ],
//     totalByDay: 'number',
//   },
// ];

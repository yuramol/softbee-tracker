import { format, hoursToMinutes, minutesToHours } from 'date-fns';
import { parseTrackerTime } from '../helpers';
import { TrackerEntity } from '../types/GraphqlTypes';

export const getTotalTime = (times: TrackerEntity[] | undefined) => {
  let currentDuration = 0;

  if (times) {
    times.forEach(({ attributes }) => {
      const trackerTime = parseTrackerTime(attributes?.duration);

      currentDuration +=
        hoursToMinutes(+format(trackerTime, 'HH')) + +format(trackerTime, 'mm');
    });
  }

  const hours = minutesToHours(currentDuration);
  const minutes = currentDuration - hours * 60;

  return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
};

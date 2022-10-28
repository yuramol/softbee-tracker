import { minutesToHours } from 'date-fns';
import { TrackerEntity } from '../types/GraphqlTypes';

export const getTotalTime = (times: TrackerEntity[] | undefined) => {
  let currentDuration = 0;

  if (times) {
    times.forEach(({ attributes }) => {
      currentDuration += attributes?.durationMinutes ?? 0;
    });
  }

  const hours = minutesToHours(currentDuration);
  const minutes = currentDuration - hours * 60;

  return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
};

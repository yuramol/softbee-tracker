import { format, hoursToMinutes } from 'date-fns';
import { parseTrackerTime } from './parseTrackerTime';

export const getMinutes = (time: string, f?: string) => {
  return (
    hoursToMinutes(+format(parseTrackerTime(time, f), 'HH')) +
    +format(parseTrackerTime(time, f), 'mm')
  );
};

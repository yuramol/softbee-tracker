import { format, hoursToMinutes } from 'date-fns';
import { parseTrackerTime } from './parseTrackerTime';

export const getMinutes = (time: string) => {
  return (
    hoursToMinutes(+format(parseTrackerTime(time), 'HH')) +
    +format(parseTrackerTime(time), 'mm')
  );
};

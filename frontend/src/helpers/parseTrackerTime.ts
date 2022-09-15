import { parse } from 'date-fns';

export const parseTrackerTime = (value: string, format = 'HH:mm:ss.SSS') => {
  return parse(value, format, new Date());
};

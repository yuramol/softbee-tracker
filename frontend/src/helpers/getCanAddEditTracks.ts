import { isBefore, subDays } from 'date-fns';

export const getCanAddEditTracks = () => {
  return isBefore(new Date(), subDays(new Date(), 5));
};

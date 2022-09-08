import { minutesToHours } from 'date-fns';

export const getHours = (minutes: number) => {
  const hours = minutesToHours(minutes);
  const mm = minutes - hours * 60;

  return `${hours}:${mm < 10 ? `0${mm}` : mm}`;
};

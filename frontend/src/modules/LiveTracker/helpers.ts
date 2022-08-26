import { differenceInSeconds } from 'date-fns';

export const intervalDateSeconds = ({
  startDate = new Date(),
  endDate = new Date(),
}) => {
  return differenceInSeconds(startDate, endDate);
};

export function secondsToHmsHumanFormat(secondsTime: number) {
  const { hours, minutes, seconds } = secondsToHms(secondsTime);

  const hDisplay = hours > 0 ? hours + 'h ' : '';
  const mDisplay = minutes > 0 ? minutes + 'm ' : '';
  const sDisplay = seconds > 0 ? seconds + 's ' : '';
  return hDisplay + mDisplay + sDisplay;
}

export function secondsToHms(secondsTime: number) {
  const hours = Math.floor(secondsTime / 3600);
  const minutes = Math.floor((secondsTime % 3600) / 60);
  const seconds = Math.floor((secondsTime % 3600) % 60);
  return {
    hours: hours > 0 ? hours : 0,
    minutes: minutes > 0 ? minutes : 0,
    seconds: seconds > 0 ? seconds : 0,
  };
}

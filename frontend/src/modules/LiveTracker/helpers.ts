import { IconButton, styled } from '@mui/material';
import { differenceInSeconds } from 'date-fns';

export const IconButtonTracker = styled(IconButton)(() => ({
  borderRadius: 0,
  height: '3rem',
  width: '3rem',
}));

export const intervalDateSeconds = ({
  startDate = new Date(),
  endDate = new Date(),
}) => {
  return differenceInSeconds(startDate, endDate);
};

export function secondsToHmsHumanFormat(secondsTime: number) {
  const { hours, minutes, seconds } = secondsToHms(secondsTime);

  const hDisplay = hours >= 10 ? `${hours}h ` : `0${hours ?? 0}h `;
  const mDisplay = minutes >= 10 ? `${minutes}m ` : `0${minutes ?? 0}m `;
  const sDisplay = seconds >= 10 ? `${seconds}s ` : `0${seconds ?? 0}s `;
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

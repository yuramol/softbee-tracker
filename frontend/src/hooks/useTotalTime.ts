import { parse, secondsToMinutes, startOfToday } from 'date-fns';
import { TrackerEntity } from '../types/GraphqlTypes';

export const useTotalTime = (times: TrackerEntity[] | undefined) => {
  let currentDuration = 0;
  if (times) {
    times.map(({ attributes }) => {
      const parseTime = parse(attributes?.duration, 'HH:mm:ss.SSS', new Date());
      if (!isNaN(parseTime.getTime())) {
        const timeSecond =
          (parseTime.getTime() - startOfToday().getTime()) / 1000;
        currentDuration += timeSecond;
      }
    });
  }

  const minutes = secondsToMinutes(currentDuration);
  const hours = minutes / 60;
  const aroundHours = Math.floor(hours);
  const currentMinutes = Math.floor((hours - aroundHours) * 60);

  const formatHours = `${aroundHours < 10 ? '0' : ''}${aroundHours}`;
  const formatMinutes = `${currentMinutes < 10 ? '0' : ''}${currentMinutes}`;

  return {
    totalTime: `${formatHours}:${formatMinutes}`,
  };
};

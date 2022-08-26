import { useEffect, useState } from 'react';

import { intervalDateSeconds, secondsToHmsHumanFormat } from '../helpers';

const useDurationTimer = (targetDate: Date) => {
  const [distance, setDistance] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const seconds = intervalDateSeconds({ endDate: targetDate });
      setDistance(secondsToHmsHumanFormat(seconds));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return distance;
};

export { useDurationTimer };

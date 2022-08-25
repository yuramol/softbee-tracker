import { formatDistanceToNowStrict } from 'date-fns';
import { useEffect, useState } from 'react';

const useDurationTimer = (targetDate: Date) => {
  const [distance, setDistance] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDistance(formatDistanceToNowStrict(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return distance;
};

export { useDurationTimer };

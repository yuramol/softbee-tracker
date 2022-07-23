import {
  addDays,
  endOfDay,
  format,
  lastDayOfWeek,
  startOfWeek,
} from 'date-fns';

export const useCurrentWeek = () => {
  const currentDatas = new Date();
  const weekEnd = lastDayOfWeek(currentDatas, {
    weekStartsOn: 1,
  });
  const weekStart = startOfWeek(currentDatas, {
    weekStartsOn: 1,
  });
  const days = [];

  for (let i = 0; i <= 6; i++) {
    days.push({
      day: format(addDays(weekStart, i), 'E'),
      dayNumber: format(addDays(weekStart, i), 'i'),
      date: format(addDays(weekStart, i), 'do MMM'),
      fullDate: format(addDays(weekStart, i), 'yyyy-MM-dd'),
    });
  }

  return {
    weekStart: format(weekStart, 'yyyy-MM-dd'),
    weekEnd: format(weekEnd, 'yyyy-MM-dd'),
    days,
    currentDay: format(endOfDay(new Date()), 'i'),
  };
};

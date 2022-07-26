import { format, addDays, endOfDay, startOfWeek, endOfWeek } from 'date-fns';

export const useCurrentWeek = () => {
  const currentDate = new Date();
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
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
    currentDay: format(endOfDay(currentDate), 'i'),
    weekStart: format(weekStart, 'yyyy-MM-dd'),
    weekEnd: format(weekEnd, 'yyyy-MM-dd'),
    days,
  };
};

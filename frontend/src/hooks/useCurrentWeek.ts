import moment from 'moment';

export const useCurrentWeek = () => {
  const currentDate = moment();

  const weekStart = currentDate.clone().startOf('isoWeek');
  const weekEnd = currentDate.clone().endOf('isoWeek');
  const days = [];

  for (let i = 0; i <= 6; i++) {
    days.push({
      day: moment(weekStart).add(i, 'days').format('dddd'),
      date: moment(weekStart).add(i, 'days').format('Do MMM'),
      fullDate: moment(weekStart).add(i, 'days').format('YYYY-MM-DD'),
    });
  }

  return {
    weekStart: weekStart.format('YYYY-MM-DD'),
    weekEnd: weekEnd.format('YYYY-MM-DD'),
    days,
  };
};

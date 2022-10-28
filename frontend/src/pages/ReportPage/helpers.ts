import {
  endOfMonth,
  endOfQuarter,
  endOfWeek,
  endOfYear,
  startOfMonth,
  startOfQuarter,
  startOfWeek,
  startOfYear,
  subMonths,
  subQuarters,
  subWeeks,
  subYears,
} from 'date-fns';
import { DefaultRangeDatesItem } from 'legos/RangeCalendar';

export const reportRangeDates: DefaultRangeDatesItem[] = [
  {
    label: 'Current week',
    value: [
      startOfWeek(new Date(), { weekStartsOn: 1 }),
      endOfWeek(new Date(), { weekStartsOn: 1 }),
    ],
  },
  {
    label: 'Last week',
    value: [
      startOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }),
      endOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }),
    ],
  },
  {
    label: 'Current month',
    value: [startOfMonth(new Date()), endOfMonth(new Date())],
  },
  {
    label: 'Last month',
    value: [
      startOfMonth(subMonths(new Date(), 1)),
      endOfMonth(subMonths(new Date(), 1)),
    ],
  },
  {
    label: 'Current quarter',
    value: [startOfQuarter(new Date()), endOfQuarter(new Date())],
  },
  {
    label: 'Last quarter',
    value: [
      startOfQuarter(subQuarters(new Date(), 1)),
      endOfQuarter(subQuarters(new Date(), 1)),
    ],
  },
  {
    label: 'Current year',
    value: [startOfYear(new Date()), endOfYear(new Date())],
  },
  {
    label: 'Last year',
    value: [
      startOfYear(subYears(new Date(), 1)),
      endOfYear(subYears(new Date(), 1)),
    ],
  },
];

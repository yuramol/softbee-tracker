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
import { getFormattedDate } from 'helpers';
import { DefaultRangeDatesItem } from 'legos/RangeCalendar';

export const reportRangeDates: DefaultRangeDatesItem[] = [
  {
    label: 'Current week',
    value: [
      getFormattedDate(startOfWeek(new Date(), { weekStartsOn: 1 })),
      getFormattedDate(endOfWeek(new Date(), { weekStartsOn: 1 })),
    ],
  },
  {
    label: 'Last week',
    value: [
      getFormattedDate(
        startOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 })
      ),
      getFormattedDate(endOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 })),
    ],
  },
  {
    label: 'Current month',
    value: [
      getFormattedDate(startOfMonth(new Date())),
      getFormattedDate(endOfMonth(new Date())),
    ],
  },
  {
    label: 'Last month',
    value: [
      getFormattedDate(startOfMonth(subMonths(new Date(), 1))),
      getFormattedDate(endOfMonth(subMonths(new Date(), 1))),
    ],
  },
  {
    label: 'Current quarter',
    value: [
      getFormattedDate(startOfQuarter(new Date())),
      getFormattedDate(endOfQuarter(new Date())),
    ],
  },
  {
    label: 'Last quarter',
    value: [
      getFormattedDate(startOfQuarter(subQuarters(new Date(), 1))),
      getFormattedDate(endOfQuarter(subQuarters(new Date(), 1))),
    ],
  },
  {
    label: 'Current year',
    value: [
      getFormattedDate(startOfYear(new Date())),
      getFormattedDate(endOfYear(new Date())),
    ],
  },
  {
    label: 'Last year',
    value: [
      getFormattedDate(startOfYear(subYears(new Date(), 1))),
      getFormattedDate(endOfYear(subYears(new Date(), 1))),
    ],
  },
];

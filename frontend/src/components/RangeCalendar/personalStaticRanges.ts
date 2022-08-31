import {
  addQuarters,
  addYears,
  endOfQuarter,
  endOfYear,
  isSameDay,
  startOfQuarter,
  startOfYear,
} from 'date-fns';

type dateValuesProps = {
  startDate: Date;
  endDate: Date;
  key: string;
};

const defineds = {
  startOfQuarter: startOfQuarter(new Date()),
  endOfQuarter: endOfQuarter(new Date()),
  startOfLastQuarter: startOfQuarter(addQuarters(new Date(), -1)),
  endOfLastQuarter: endOfQuarter(addQuarters(new Date(), -1)),
  startOfYear: startOfYear(new Date()),
  endOfYear: endOfYear(new Date()),
  startOfLastYear: startOfYear(addYears(new Date(), -1)),
  endOfLastYear: endOfYear(addYears(new Date(), -1)),
};

const staticRangeHandler = {
  range: {},
  isSelected(range: dateValuesProps) {
    const definedRange = this.range();
    return (
      isSameDay(range.startDate, definedRange.startDate) &&
      isSameDay(range.endDate, definedRange.endDate)
    );
  },
};

export const createStaticRanges = (ranges: object[]) => {
  return ranges.map((range) => ({ ...staticRangeHandler, ...range }));
};

export const personalStaticRanges = createStaticRanges([
  {
    label: 'This Quarter',
    range: () => ({
      startDate: defineds.startOfQuarter,
      endDate: defineds.endOfQuarter,
    }),
  },
  {
    label: 'Last Quarter',
    range: () => ({
      startDate: defineds.startOfLastQuarter,
      endDate: defineds.endOfLastQuarter,
    }),
  },
  {
    label: 'This Year',
    range: () => ({
      startDate: defineds.startOfYear,
      endDate: defineds.endOfYear,
    }),
  },
  {
    label: 'Last Year',
    range: () => ({
      startDate: defineds.startOfLastYear,
      endDate: defineds.endOfLastYear,
    }),
  },
]);

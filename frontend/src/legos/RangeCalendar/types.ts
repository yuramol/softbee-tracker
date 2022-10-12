export type DefaultRangeDatesItem = {
  label: string;
  value: [string, string];
};

export type RangeCalendarProps = {
  selectedDates: Date[];
  setSelectedDates: React.Dispatch<React.SetStateAction<Date[]>>;
  defaultRangeDates?: DefaultRangeDatesItem[];
  disablePast?: boolean;
  disableFuture?: boolean;
  maxDate?: Date;
  minDate?: Date;
};

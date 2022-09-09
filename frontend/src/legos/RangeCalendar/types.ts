export type DefaultRangeDatesItem = {
  label: string;
  value: [string, string];
};

export type RangeCalendarProps = {
  selectedDates: string[];
  setSelectedDates: React.Dispatch<React.SetStateAction<string[]>>;
  defaultRangeDates?: DefaultRangeDatesItem[];
};

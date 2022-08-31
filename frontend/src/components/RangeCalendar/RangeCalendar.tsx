import * as React from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker, defaultStaticRanges } from 'react-date-range';
import { personalStaticRanges } from './personalStaticRanges';

export const RangeCalendar = () => {
  const [dateValues, setDateValues] = React.useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const staticRanges = [...defaultStaticRanges, ...personalStaticRanges];

  return (
    <DateRangePicker
      onChange={({ selection }) => setDateValues([selection])}
      moveRangeOnFirstSelection={false}
      ranges={dateValues}
      direction="horizontal"
      inputRanges={[]}
      staticRanges={staticRanges}
    />
  );
};

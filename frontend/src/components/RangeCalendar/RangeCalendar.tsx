import * as React from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import styled from 'styled-components';
import { theme } from 'theme';
import {
  DateRangePicker as DateRange,
  defaultStaticRanges,
} from 'react-date-range';
import { personalStaticRanges } from './personalStaticRanges';

const DateRangePicker = styled(DateRange)`
  .rdrCalendarWrapper
    .rdrMonths
    .rdrMonth
    .rdrDays
    .rdrDayToday
    .rdrDayNumber
    span:after {
    background: ${theme.palette.primary.main};
  }
  .rdrCalendarWrapper
    .rdrMonths
    .rdrMonth
    .rdrDays
    .rdrDayToday:not(.rdrDayPassive)
    .rdrStartEdge
    ~ .rdrDayNumber
    span:after,
  .rdrCalendarWrapper
    .rdrMonths
    .rdrMonth
    .rdrDays
    .rdrDayToday:not(.rdrDayPassive)
    .rdrInRange
    ~ .rdrDayNumber
    span:after,
  .rdrCalendarWrapper
    .rdrMonths
    .rdrMonth
    .rdrDays
    .rdrDayToday:not(.rdrDayPassive)
    .rdrEndEdge
    ~ .rdrDayNumber
    span:after,
  .rdrCalendarWrapper
    .rdrMonths
    .rdrMonth
    .rdrDays
    .rdrDayToday:not(.rdrDayPassive)
    .rdrSelected
    ~ .rdrDayNumber
    span:after {
    background: ${theme.palette.common.white};
  }
`;

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
      weekStartsOn={1}
      rangeColors={[theme.palette.primary.main]}
    />
  );
};

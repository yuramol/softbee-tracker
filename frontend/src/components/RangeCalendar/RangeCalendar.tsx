import * as React from 'react';
import { Dayjs } from 'dayjs';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ButtonGroup, Button, Input, OutlinedInput } from '@mui/material';
import {
  endOfMonth,
  endOfQuarter,
  endOfWeek,
  endOfYear,
  format,
  startOfMonth,
  startOfQuarter,
  startOfWeek,
  startOfYear,
  subMonths,
  subQuarters,
  subWeeks,
  subYears,
} from 'date-fns';

export const RangeCalendar = () => {
  const [value, setValue] = React.useState<Dayjs | null>(null);
  const [dateValue, setDateValue] = React.useState<Date[]>([
    new Date(),
    new Date(),
  ]);
  const [open, setOpen] = React.useState(false);

  console.log(dateValue);

  const getCurrentWeekDates = () => {
    setDateValue([
      startOfWeek(new Date(), { weekStartsOn: 1 }),
      endOfWeek(new Date(), { weekStartsOn: 1 }),
    ]);
  };
  const getLastWeekDates = () => {
    setDateValue([
      startOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }),
      endOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }),
    ]);
  };
  const getCurrentMonthDates = () => {
    setDateValue([startOfMonth(new Date()), endOfMonth(new Date())]);
  };
  const getPastMonthDates = () => {
    setDateValue([
      startOfMonth(subMonths(new Date(), 1)),
      endOfMonth(subMonths(new Date(), 1)),
    ]);
  };
  const getCurrentQuarterDates = () => {
    setDateValue([startOfQuarter(new Date()), endOfQuarter(new Date())]);
  };
  const getPastQuarterDates = () => {
    setDateValue([
      startOfQuarter(subQuarters(new Date(), 1)),
      endOfQuarter(subQuarters(new Date(), 1)),
    ]);
  };
  const getCurrentYearDates = () => {
    setDateValue([startOfYear(new Date()), endOfYear(new Date())]);
  };
  const getPastYearDates = () => {
    setDateValue([
      startOfYear(subYears(new Date(), 1)),
      endOfYear(subYears(new Date(), 1)),
    ]);
  };

  const inputValue = `${format(dateValue[0], 'dd/MM/yyyy')} ${
    dateValue[0].getDate() !== dateValue[1].getDate()
      ? `- ${format(dateValue[1], 'dd/MM/yyyy')}`
      : ''
  }`;

  const renderInput = (props: TextFieldProps) => (
    /* eslint-disable react/prop-types */
    <OutlinedInput
      type="text"
      inputRef={props.inputRef}
      value={inputValue}
      onClick={() => setOpen(true)}
      onChange={props.onChange}
      endAdornment={props.InputProps?.endAdornment}
    />
  );

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={inputValue}
          value={value}
          views={['day']}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          onChange={(newValue) => {
            console.log(newValue);

            setValue(newValue);
            setDateValue([new Date(newValue), new Date(newValue)]);
          }}
          renderInput={renderInput}
        />
      </LocalizationProvider>
      <ButtonGroup size="small" orientation="vertical">
        <Button onClick={getCurrentWeekDates}>Current week</Button>
        <Button onClick={getLastWeekDates}>Last week</Button>
        <Button onClick={getCurrentMonthDates}>Current month</Button>
        <Button onClick={getPastMonthDates}>Past month</Button>
        <Button onClick={getCurrentQuarterDates}>Current quarter</Button>
        <Button onClick={getPastQuarterDates}>Past quarter</Button>
        <Button onClick={getCurrentYearDates}>Current year</Button>
        <Button onClick={getPastYearDates}>Past year</Button>
      </ButtonGroup>
    </>
  );
};

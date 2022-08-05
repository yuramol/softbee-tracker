import React from 'react';
import { TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  DesktopDatePicker,
  DesktopDatePickerProps,
} from '@mui/x-date-pickers/DesktopDatePicker';
import enGb from 'date-fns/locale/en-GB';

export type CalendarPickerProps = Omit<
  DesktopDatePickerProps<Date, Date>,
  'renderInput'
> &
  React.RefAttributes<HTMLDivElement> & {
    value: Date;
    isMinDateFirstDayOfMonth?: boolean;
  };

export const CalendarPicker = ({
  value,
  isMinDateFirstDayOfMonth = false,
  onChange,
  ...arg
}: CalendarPickerProps) => {
  const firstDayOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth()
  );
  return (
    <LocalizationProvider adapterLocale={enGb} dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        minDate={isMinDateFirstDayOfMonth ? firstDayOfMonth : undefined}
        {...arg}
        value={value}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} fullWidth />}
      />
    </LocalizationProvider>
  );
};

import React from 'react';
import { useFormikContext } from 'formik';
import { TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import enGb from 'date-fns/locale/en-GB';

type CalendarPickerProps = {
  name: string;
};

export const CalendarPicker = ({ name }: CalendarPickerProps) => {
  const [value, setValue] = React.useState<Date | null>(new Date());
  const { values, setFieldValue } = useFormikContext();

  const firstDayOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );
  return (
    <LocalizationProvider adapterLocale={enGb} dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        value={values.date || value}
        minDate={firstDayOfMonth}
        onChange={(newValue) => {
          setValue(newValue);
          setFieldValue(name, newValue);
        }}
        renderInput={(params) => <TextField {...params} fullWidth />}
      />
    </LocalizationProvider>
  );
};

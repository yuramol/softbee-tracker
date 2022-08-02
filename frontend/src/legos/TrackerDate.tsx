import React from 'react';
import { useFormikContext } from 'formik';
import { TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import enGb from 'date-fns/locale/en-GB';

export const TrackerDate = () => {
  const [value, setValue] = React.useState<Date | null>(new Date());
  const { setFieldValue } = useFormikContext();
  return (
    <LocalizationProvider adapterLocale={enGb} dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          setFieldValue('date', newValue);
        }}
        renderInput={(params) => <TextField {...params} fullWidth />}
      />
    </LocalizationProvider>
  );
};

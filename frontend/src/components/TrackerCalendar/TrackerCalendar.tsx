import React, { useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import Grid from '@mui/material/Grid';

export const TrackerCalendar = () => {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <CalendarPicker
            date={date}
            onChange={(newDate) => setDate(newDate)}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

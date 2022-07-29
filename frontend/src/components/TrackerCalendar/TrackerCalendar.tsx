import React, { useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import Grid from '@mui/material/Grid';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import enGb from 'date-fns/locale/en-GB';

const testTrackerTime = [
  { time: 8, date: new Date(2022, 6, 25) },
  { time: 2, date: new Date(2022, 6, 26) },
  { time: 6, date: new Date(2022, 6, 27) },
  { time: 5, date: new Date(2022, 6, 28) },
  { time: 3, date: new Date(2022, 6, 29) },
  { time: 3, date: new Date(2022, 7, 3) },
];
// Thu Jul 28 2022 00:00:00 GMT+0300 (Eastern European Summer Time)

export const TrackerCalendar = () => {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <LocalizationProvider adapterLocale={enGb} dateAdapter={AdapterDateFns}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <CalendarPicker
            date={date}
            onChange={(newDate) => setDate(newDate)}
            renderDay={(day, _value, DayComponentProps) => {
              console.log(DayComponentProps);

              const weekendStyles = {
                backgroundColor: 'orange',
                marginLeft: '28.5px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
              };

              const enoughHourStyles = {
                ...weekendStyles,
                backgroundColor: 'green',
              };

              const lessHourStyles = {
                ...weekendStyles,
                backgroundColor: 'red',
              };

              const isWeekend = day.getDay() === 0 || day.getDay() === 6;
              let isWorkDay;
              let isEnoughHours;

              testTrackerTime.find(({ time, date }) => {
                if (day.getTime() === date.getTime()) {
                  isWorkDay = true;
                  time >= 5 ? (isEnoughHours = true) : (isEnoughHours = false);
                }
              });
              return (
                <Badge
                  key={day.toString()}
                  overlap='circular'
                  badgeContent={
                    isWeekend ? (
                      <div style={weekendStyles}></div>
                    ) : isWorkDay ? (
                      isEnoughHours ? (
                        <div style={enoughHourStyles}></div>
                      ) : (
                        <div style={lessHourStyles}></div>
                      )
                    ) : null
                  }
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                  <PickersDay {...DayComponentProps} />
                </Badge>
              );
            }}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

import React, { useState } from 'react';
import {
  LocalizationProvider,
  CalendarPicker,
  PickersDay,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Badge } from '@mui/material';
import enGb from 'date-fns/locale/en-GB';

type TrackerCalendarProps = {
  date: Date | null;
  setDateHandler: (date: Date) => void;
};

// TODO - change these working days data to real data from the server
const testTrackerTime = [
  { time: 8, date: new Date(2022, 6, 25) },
  { time: 2, date: new Date(2022, 6, 26) },
  { time: 6, date: new Date(2022, 6, 27) },
  { time: 5, date: new Date(2022, 6, 28) },
  { time: 3, date: new Date(2022, 6, 29) },
  { time: 9, date: new Date(2022, 7, 30) },
  { time: 3, date: new Date(2022, 7, 31) },
  { time: 5, date: new Date(2022, 8, 1) },
];

const weekendStyles = {
  backgroundColor: '#ffa500',
  width: '8px',
  height: '8px',
  borderRadius: '50%',
};

const enoughHourStyles = {
  ...weekendStyles,
  backgroundColor: '#008000',
};

const lessHourStyles = {
  ...weekendStyles,
  backgroundColor: '#ff0000',
};

export const TrackerCalendar = ({
  date,
  setDateHandler,
}: TrackerCalendarProps) => {
  const [curDate, setDate] = useState<Date | null>(date);
  const [currentMonth, setCurrentMonth] = useState(date?.getMonth());

  return (
    <LocalizationProvider adapterLocale={enGb} dateAdapter={AdapterDateFns}>
      <CalendarPicker
        date={curDate}
        views={['day']}
        onChange={(newDate) => {
          if (newDate) {
            setDateHandler(newDate);
          }
          setDate(newDate);
        }}
        onMonthChange={(newMonth) => {
          setCurrentMonth(newMonth.getMonth());
        }}
        renderDay={(day, _value, DayComponentProps) => {
          const isWeekend = day.getDay() === 0 || day.getDay() === 6;
          let isWorkDay;
          let isEnoughHours;

          testTrackerTime.find(({ time, date }) => {
            if (day.getTime() === date.getTime()) {
              isWorkDay = true;
              time >= 5 ? (isEnoughHours = true) : (isEnoughHours = false);
            }
          });

          return day.getMonth() === currentMonth ? (
            <Badge
              key={day.toString()}
              overlap="circular"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              sx={{
                '& 	.MuiBadge-badge': {
                  width: '100%',
                  justifyContent: 'left',
                  paddingLeft: '2px',
                },
              }}
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
            >
              <PickersDay {...DayComponentProps} />
            </Badge>
          ) : (
            <PickersDay {...DayComponentProps} />
          );
        }}
      />
    </LocalizationProvider>
  );
};

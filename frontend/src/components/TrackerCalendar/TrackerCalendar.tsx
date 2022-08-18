import React, { useState } from 'react';
import {
  LocalizationProvider,
  CalendarPicker,
  PickersDay,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Badge } from '@mui/material';
import enGb from 'date-fns/locale/en-GB';
import { LegendCalendar } from './LegendCalendar';
import { endOfMonth, format, startOfMonth, subMonths } from 'date-fns';
import { useNormalizedTrackers } from 'hooks';
import { useAuth } from 'AuthProvider';

type TrackerCalendarProps = {
  selectedDay: Date | null;
  setSelectedDay: (date: Date) => void;
};

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
  selectedDay,
  setSelectedDay,
}: TrackerCalendarProps) => {
  const [curDay, setCurDay] = useState<Date | null>(selectedDay);
  const [curMonth, setCurMonth] = useState(selectedDay?.getMonth());
  const [startMonth, setStartMonth] = useState(
    format(startOfMonth(new Date()), 'YYY-MM-dd')
  );
  const [endMonth, setEndMonth] = useState(
    format(endOfMonth(new Date()), 'YYY-MM-dd')
  );
  const { user } = useAuth();
  const { trackers } = useNormalizedTrackers(user.id, startMonth, endMonth);

  return (
    <>
      <LocalizationProvider adapterLocale={enGb} dateAdapter={AdapterDateFns}>
        <CalendarPicker
          date={curDay}
          views={['day']}
          disableFuture
          minDate={startOfMonth(subMonths(new Date(), 1))}
          onChange={(newDate) => {
            if (newDate) {
              setSelectedDay(newDate);
            }
            setCurDay(newDate);
          }}
          onMonthChange={(newMonth) => {
            setStartMonth(format(startOfMonth(newMonth), 'YYY-MM-dd'));
            setEndMonth(format(endOfMonth(newMonth), 'YYY-MM-dd'));
            setCurMonth(newMonth.getMonth());
          }}
          renderDay={(day, _value, DayComponentProps) => {
            const isWeekend = day.getDay() === 0 || day.getDay() === 6;
            let isWorkDay;
            let isEnoughHours;

            trackers.find(({ date, total }) => {
              if (
                day.getTime() === new Date(new Date(date).setHours(0)).getTime()
              ) {
                isWorkDay = true;
                const time = total.split(':');
                +time[0] + +time[1] >= 5
                  ? (isEnoughHours = true)
                  : (isEnoughHours = false);
              }
            });

            return day.getMonth() === curMonth && new Date() >= day ? (
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
      <LegendCalendar />
    </>
  );
};

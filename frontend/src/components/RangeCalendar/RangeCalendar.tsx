import React, { useRef, useState } from 'react';
import {
  PickersDay,
  StaticDatePicker,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import enGb from 'date-fns/locale/en-GB';
import {
  ButtonGroup,
  Button,
  Stack,
  TextField,
  Typography,
  IconButton,
  Popper,
  ClickAwayListener,
} from '@mui/material';
import {
  endOfMonth,
  endOfQuarter,
  endOfWeek,
  endOfYear,
  format,
  isAfter,
  isBefore,
  startOfMonth,
  startOfQuarter,
  startOfWeek,
  startOfYear,
  subDays,
  subMonths,
  subQuarters,
  subWeeks,
  subYears,
} from 'date-fns';

import { Icon } from 'legos';

const getFormattedDate = (date: Date) => format(date, 'yyyy-MM-dd');

const rangeDates = [
  {
    label: 'Current week',
    value: [
      getFormattedDate(startOfWeek(new Date(), { weekStartsOn: 1 })),
      getFormattedDate(endOfWeek(new Date(), { weekStartsOn: 1 })),
    ],
  },
  {
    label: 'Last week',
    value: [
      getFormattedDate(
        startOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 })
      ),
      getFormattedDate(endOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 })),
    ],
  },
  {
    label: 'Current month',
    value: [
      getFormattedDate(startOfMonth(new Date())),
      getFormattedDate(endOfMonth(new Date())),
    ],
  },
  {
    label: 'Last month',
    value: [
      getFormattedDate(startOfMonth(subMonths(new Date(), 1))),
      getFormattedDate(endOfMonth(subMonths(new Date(), 1))),
    ],
  },
  {
    label: 'Current quarter',
    value: [
      getFormattedDate(startOfQuarter(new Date())),
      getFormattedDate(endOfQuarter(new Date())),
    ],
  },
  {
    label: 'Last quarter',
    value: [
      getFormattedDate(startOfQuarter(subQuarters(new Date(), 1))),
      getFormattedDate(endOfQuarter(subQuarters(new Date(), 1))),
    ],
  },
  {
    label: 'Current year',
    value: [
      getFormattedDate(startOfYear(new Date())),
      getFormattedDate(endOfYear(new Date())),
    ],
  },
  {
    label: 'Last year',
    value: [
      getFormattedDate(startOfYear(subYears(new Date(), 1))),
      getFormattedDate(endOfYear(subYears(new Date(), 1))),
    ],
  },
];

export const RangeCalendar = () => {
  const rangeCalendarRef = useRef(null);
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [dateArray, setDateArray] = useState<string[]>([
    getFormattedDate(new Date()),
  ]);
  const [value, setValue] = React.useState<Date | null>(new Date(dateArray[0]));

  const handleClickAway = () => {
    setAnchorEl(null);
    setIsPopperOpen(!isPopperOpen);
  };

  const handleOpenRangeCalendar = () => {
    setAnchorEl(rangeCalendarRef.current);
    setIsPopperOpen(!isPopperOpen);
  };

  const handleSetDate = (date: Date) => {
    const selectedDay = getFormattedDate(date);
    const newDateArray = [...dateArray];

    if (newDateArray.length < 2) {
      newDateArray.push(selectedDay);
    } else {
      newDateArray.length = 0;
      newDateArray.push(selectedDay);
    }

    setDateArray(newDateArray.sort());
    setValue(new Date(newDateArray[0]));
  };

  const handleSetRangeDate = (value: string[]) => {
    setDateArray(value);
    setValue(new Date(value[0]));
  };

  return (
    <>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        ref={rangeCalendarRef}
        // border="1px solid rgba(0,0,0,0.25)"
        // borderRadius={1}
        // pt="1px"
        // pb="1px"
      >
        <Stack>
          <Typography fontWeight="600">Period:</Typography>
          <Typography>{`${format(new Date(dateArray[0]), 'd MMM yyyy')}${
            dateArray[1]
              ? ` - ${format(new Date(dateArray[1]), 'd MMM yyyy')}`
              : ''
          }`}</Typography>
        </Stack>

        <IconButton color="primary" onClick={handleOpenRangeCalendar}>
          <Icon icon="calendarMonth" size="small" />
        </IconButton>
      </Stack>
      {isPopperOpen && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Popper open={isPopperOpen} anchorEl={anchorEl}>
            <Stack
              flexDirection="row"
              bgcolor="background.paper"
              border={(t) => `1px solid ${t.palette.primary.main}`}
              borderRadius={1}
              gap={1}
              pt={3}
              pr={4}
              pl={1}
            >
              <LocalizationProvider
                adapterLocale={enGb}
                dateAdapter={AdapterDateFns}
              >
                <StaticDatePicker
                  displayStaticWrapperAs="desktop"
                  openTo="day"
                  views={['day']}
                  value={value}
                  onChange={(newValue) => handleSetDate(newValue as Date)}
                  renderInput={(params) => <TextField {...params} />}
                  renderDay={(day, selectedDays, pickersDayProps) => {
                    const isBetweenDates =
                      isAfter(day, subDays(new Date(dateArray[0]), 1)) &&
                      isBefore(day, new Date(dateArray[1]));

                    return (
                      <PickersDay
                        className={isBetweenDates ? 'Mui-selected' : ''}
                        {...pickersDayProps}
                      />
                    );
                  }}
                />
              </LocalizationProvider>
              <ButtonGroup orientation="vertical" sx={{ mt: 2 }}>
                {rangeDates.map(({ label, value }) => (
                  <Button
                    key={label}
                    variant={dateArray === value ? 'contained' : 'text'}
                    onClick={() => handleSetRangeDate(value)}
                    style={{ justifyContent: 'flex-start', borderRadius: 0 }}
                  >
                    {label}
                  </Button>
                ))}
              </ButtonGroup>
            </Stack>
          </Popper>
        </ClickAwayListener>
      )}
    </>
  );
};

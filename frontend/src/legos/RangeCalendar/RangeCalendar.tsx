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
import { format, isAfter, isBefore, subDays } from 'date-fns';

import { Icon } from 'legos';
import { getFormattedDate } from 'helpers';
import { RangeCalendarProps } from './types';

export const RangeCalendar: React.FC<RangeCalendarProps> = ({
  selectedDates,
  setSelectedDates,
  defaultRangeDates,
}) => {
  const isSetDefaultRangeDates = !!defaultRangeDates;
  const rangeCalendarRef = useRef(null);
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [value, setValue] = React.useState<Date | null>(
    new Date(selectedDates[0])
  );

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
    const newSelectedDates = [...selectedDates];

    if (newSelectedDates.length < 2) {
      newSelectedDates.push(selectedDay);
    } else {
      newSelectedDates.length = 0;
      newSelectedDates.push(selectedDay);
    }

    setSelectedDates(newSelectedDates.sort());
    setValue(new Date(newSelectedDates[0]));
  };

  const handleSetRangeDate = (value: string[]) => {
    setSelectedDates(value);
    setValue(new Date(value[0]));
  };

  return (
    <>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        ref={rangeCalendarRef}
        mb={2}
      >
        <Stack>
          <Typography fontWeight="600">Period:</Typography>
          <Typography>{`${format(new Date(selectedDates[0]), 'd MMM yyyy')}${
            selectedDates[1]
              ? ` - ${format(new Date(selectedDates[1]), 'd MMM yyyy')}`
              : ''
          }`}</Typography>
        </Stack>

        <IconButton color="primary" onClick={handleOpenRangeCalendar}>
          <Icon icon="calendarMonth" size="small" />
        </IconButton>
      </Stack>
      {isPopperOpen && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Popper
            open={isPopperOpen}
            anchorEl={anchorEl}
            style={{ zIndex: 2000 }}
          >
            <Stack
              flexDirection="row"
              bgcolor="background.paper"
              border={(t) => `1px solid ${t.palette.primary.main}`}
              borderRadius={1}
              gap={1}
              pt={3}
              pr={4}
              pl={isSetDefaultRangeDates ? 1 : 4}
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
                      isAfter(day, subDays(new Date(selectedDates[0]), 1)) &&
                      isBefore(day, new Date(selectedDates[1]));

                    return (
                      <PickersDay
                        className={isBetweenDates ? 'Mui-selected' : ''}
                        {...pickersDayProps}
                      />
                    );
                  }}
                />
              </LocalizationProvider>
              {isSetDefaultRangeDates && (
                <ButtonGroup orientation="vertical" sx={{ mt: 2 }}>
                  {defaultRangeDates.map(({ label, value }) => (
                    <Button
                      key={label}
                      variant={selectedDates === value ? 'contained' : 'text'}
                      onClick={() => handleSetRangeDate(value)}
                      style={{ justifyContent: 'flex-start', borderRadius: 0 }}
                    >
                      {label}
                    </Button>
                  ))}
                </ButtonGroup>
              )}
            </Stack>
          </Popper>
        </ClickAwayListener>
      )}
    </>
  );
};

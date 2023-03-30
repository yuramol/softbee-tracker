import React, { useState, WheelEvent } from 'react';
import {
  Box,
  Dialog,
  DialogContent,
  FormControl,
  FormHelperText,
  InputAdornment,
  SxProps,
  Theme,
} from '@mui/material';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

import { Input } from 'legos';

import {
  addOrSubtractMinutes,
  hoursAndMinutesToMinutes,
  parseTime,
  toHoursAndMinutes,
} from './utils';
import { TimePickerBlock } from './TimePickerBlock';
import { Stack } from '@mui/system';

interface TimePickerProps {
  disabled?: boolean;
  minutesPerStep?: number;
  value?: number;
  from?: number;
  to?: number;
  width?: string;
  onChange: (value: number, submit?: boolean) => void;
  error?: boolean;
  name?: string;
  helperText?: string;
  sx?: SxProps<Theme>;
}

export const TimePicker = ({
  disabled,
  minutesPerStep = 5,
  value = 0,
  from,
  to,
  width,
  onChange,
  error = false,
  name,
  helperText,
  sx,
}: TimePickerProps) => {
  const [durationValue, setDurationValue] = useState(toHoursAndMinutes(value));

  const [open, setOpen] = React.useState(false);

  const { hours, minutes } = parseTime(durationValue);

  const hourglassBottomIconStyles = disabled
    ? {
        pointerEvents: 'none !important',
      }
    : {};

  const closeDialog = () => {
    onChange(hoursAndMinutesToMinutes(hours, minutes), true);

    setOpen(false);
  };

  const openDialog = () => {
    setOpen(true);
  };

  const handleHoursChange: (delta: number) => void = (delta) =>
    handleMinutesChange(60 * delta);

  const handleMinutesChange: (delta: number) => void = (delta) => {
    const nextValue = addOrSubtractMinutes(durationValue, delta, from, to);
    setDurationValue(nextValue);
  };

  const handleHoursScroll = (e: WheelEvent) => {
    if (e.deltaY < 0) {
      handleHoursChange(1);
    } else if (e.deltaY > 0) {
      handleHoursChange(-1);
    }
  };

  const handleMinutesScroll = (e: WheelEvent) => {
    if (e.deltaY < 0) {
      handleMinutesChange(minutesPerStep);
    } else if (e.deltaY > 0) {
      handleMinutesChange(-minutesPerStep);
    }
  };

  const handleOnChange = (value: string) => {
    const { hours, minutes } = parseTime(value);
    onChange(hoursAndMinutesToMinutes(hours, minutes));
  };

  return (
    <>
      <Box>
        <FormControl fullWidth error={error}>
          <Input
            disabled={disabled}
            onChange={(value) => handleOnChange(`${value}`)}
            value={durationValue}
            name={name}
            error={error}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={openDialog}
                  sx={{ cursor: 'pointer' }}
                >
                  <HourglassBottomIcon sx={hourglassBottomIconStyles} />
                </InputAdornment>
              ),
            }}
          />
          {error && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
      </Box>

      <Dialog open={open} onClose={closeDialog} onBlur={closeDialog}>
        <DialogContent>
          <Box width={width ?? '100%'} sx={sx} position="relative">
            <Stack direction="row">
              <TimePickerBlock
                number={`${hours}`}
                type="hours"
                onWheel={handleHoursScroll}
                onDownClick={() => handleHoursChange(-1)}
                onUpClick={() => handleHoursChange(1)}
              />
              :
              <TimePickerBlock
                number={`${minutes}`}
                onWheel={handleMinutesScroll}
                onDownClick={() => handleMinutesChange(-minutesPerStep)}
                onUpClick={() => handleMinutesChange(+minutesPerStep)}
              />
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

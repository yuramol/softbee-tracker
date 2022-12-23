import React, { useState, useEffect, useRef, WheelEvent } from 'react';
import {
  Box,
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
import { useScrollBlock } from 'helpers/useScrollBlock';
import TimePickerDialog from './TimePickerDialog';
import { TimePickerBlock } from './TimePickerBlock';

interface TimePickerProps {
  disabled?: boolean;
  minutesPerStep?: number;
  value?: number;
  from?: number;
  to?: number;
  width?: string;
  onChange: (value: number, submit?: boolean) => void;
  onClick?: () => void;
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
  onClick,
  error = false,
  name,
  helperText,
  sx,
}: TimePickerProps) => {
  const [durationValue, setDurationValue] = useState(toHoursAndMinutes(value));
  const [dialogOpen, setDialogOpen] = useState(false);
  const [blockScroll, allowScroll] = useScrollBlock();

  const { hours, minutes } = parseTime(durationValue);

  const dialogRef = useRef<HTMLDivElement>(null);

  const hourglassBottomIconStyles = disabled
    ? {
        pointerEvents: 'none !important',
      }
    : {};

  useEffect(() => {
    if (dialogOpen) {
      blockScroll();
    } else {
      allowScroll();
    }
  }, [dialogOpen]);

  useEffect(() => {
    setDurationValue(toHoursAndMinutes(value));
  }, [value]);

  useEffect(() => {
    if (dialogOpen) {
      dialogRef.current?.focus();
    }
  }, [dialogOpen]);

  const closeDialog = () => {
    onChange(hoursAndMinutesToMinutes(hours, minutes), true);
    if (!dialogOpen) {
      return;
    }
    setDialogOpen(false);
  };

  const openDialog = () => {
    if (dialogOpen) return;
    setDialogOpen(true);
  };

  const handleFocus = () => {
    if (onClick) {
      onClick();
    }
    openDialog();
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
    <Box width={width ?? '100%'} sx={sx} position="relative">
      <FormControl fullWidth error={error}>
        <Input
          disabled={disabled}
          onChange={(value) => handleOnChange(`${value}`)}
          onFocus={handleFocus}
          value={durationValue}
          name={name}
          error={error}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end" onClick={openDialog}>
                <HourglassBottomIcon sx={hourglassBottomIconStyles} />
              </InputAdornment>
            ),
          }}
        />
        {error && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
      {dialogOpen && (
        <TimePickerDialog ref={dialogRef} onBlur={closeDialog}>
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
        </TimePickerDialog>
      )}
    </Box>
  );
};

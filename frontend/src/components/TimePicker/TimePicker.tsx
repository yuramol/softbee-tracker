import React, { useState, useEffect, useRef, WheelEvent } from 'react';
import {
  Box,
  FormControl,
  FormHelperText,
  InputAdornment,
} from '@mui/material';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

import { Input } from 'legos';

import { addOrSubtractMinutes, parseTime } from './utils';
import { useScrollBlock } from 'helpers/useScrollBlock';
import TimePickerDialog from './TimePickerDialog';
import { TimePickerBlock } from './TimePickerBlock';

interface TimePickerProps {
  disabled?: boolean;
  minutesPerStep?: number;
  value: string;
  from?: number;
  to?: number;
  width?: string;
  onChange: (value: string, submit?: boolean) => void;
  onClick?: () => void;
  error?: boolean;
  name?: string;
  helperText?: string;
}

const TimePicker = ({
  disabled,
  minutesPerStep = 5,
  value = '00:00',
  from,
  to,
  width,
  onChange,
  onClick,
  error = false,
  name,
  helperText,
}: TimePickerProps) => {
  const [durationValue, setDurationValue] = useState(value);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [blockScroll, allowScroll] = useScrollBlock();

  const { hours, minutes } = parseTime(durationValue);

  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    blockScroll();
    return () => allowScroll();
  }, []);

  useEffect(() => {
    setDurationValue(value);
  }, [value]);

  useEffect(() => {
    if (dialogOpen) {
      dialogRef.current?.focus();
    }
  }, [dialogOpen]);

  const closeDialog = () => {
    onChange(durationValue, true);
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

  return (
    <Box width={width ?? '100%'} position="relative">
      <FormControl fullWidth error={error}>
        <Input
          disabled={disabled}
          onChange={(value) => onChange(`${value}`)}
          onFocus={handleFocus}
          value={durationValue}
          name={name}
          error={error}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end" onClick={openDialog}>
                <HourglassBottomIcon />
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

export default TimePicker;

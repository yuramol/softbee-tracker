import React, { useState, useEffect, useRef, WheelEvent } from 'react';
import { InputAdornment } from '@mui/material';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

import { Input } from 'legos';

import TimePickerDialog, { TimePickerBlock } from './TimePickerDialog';
import { addOrSubtractMinutes, parseTime } from './utils';
import { useScrollBlock } from 'helpers/useScrollBlock';

interface TimePickerProps {
  minutesPerStep?: number;
  value: string;
  from?: number;
  to?: number;
  width?: string;
  onChange: (value: string) => void;
  onClick?: () => void;
  onBlur?: () => void;
}

const TimePicker = ({
  minutesPerStep = 5,
  value = '00:00',
  from,
  to,
  width,
  onChange,
  onClick,
  onBlur,
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
    if (dialogOpen) {
      dialogRef.current?.focus();
    }
  }, [dialogOpen]);

  const closeDialog = () => {
    if (onBlur) {
      onBlur();
    }
    if (!dialogOpen) {
      return;
    }
    setDialogOpen(false);
    onChange(durationValue);
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
    <div style={{ width: width ?? '100%', position: 'relative' }}>
      <Input
        onChange={onChange}
        onFocus={handleFocus}
        value={durationValue}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" onClick={openDialog}>
              <HourglassBottomIcon />
            </InputAdornment>
          ),
        }}
      />
      {dialogOpen && (
        <TimePickerDialog ref={dialogRef} tabIndex={1} onBlur={closeDialog}>
          <div onWheel={handleHoursScroll}>
            <TimePickerBlock
              number={`${hours}`}
              onDownClick={() => handleHoursChange(-1)}
              onUpClick={() => handleHoursChange(1)}
            />
          </div>
          :
          <div onWheel={handleMinutesScroll}>
            <TimePickerBlock
              number={`${minutes}`}
              onDownClick={() => handleMinutesChange(-minutesPerStep)}
              onUpClick={() => handleMinutesChange(+minutesPerStep)}
            />
          </div>
        </TimePickerDialog>
      )}
    </div>
  );
};

export default TimePicker;

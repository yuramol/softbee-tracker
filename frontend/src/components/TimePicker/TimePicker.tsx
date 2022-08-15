import { Input } from 'legos';
import React, { useState, useEffect, useRef, WheelEvent } from 'react';

import TimePickerDialog, { TimePickerBlock } from './TimePickerDialog';
import { addOrSubtractMinutes, parseTime } from './utils';

interface TimePickerProps {
  from?: number;
  minutesPerStep?: number;
  onChange: (value: unknown) => void;
  to?: number;
  value: string;
}

const TimePicker = ({
  minutesPerStep = 5,
  onChange,
  from,
  to,
  value = '00:00',
}: TimePickerProps) => {
  const [durationValue, setDurationValue] = useState(value);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { hours, minutes } = parseTime(durationValue);

  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dialogOpen) {
      dialogRef.current?.focus();
    }
  }, [dialogOpen]);

  const closeDialog = () => {
    if (!dialogOpen) return;
    setDialogOpen(false);
    onChange(durationValue);
  };

  const openDialog = () => {
    if (dialogOpen) return;
    setDialogOpen(true);
  };

  const handleFocus = () => {
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
    <div style={{ width: '100%', position: 'relative' }}>
      <Input
        onChange={onChange}
        onFocus={handleFocus}
        disableUnderline
        value={durationValue}
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

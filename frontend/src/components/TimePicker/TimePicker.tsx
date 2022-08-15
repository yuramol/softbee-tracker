import { Input } from 'legos';
import React, { useState, useEffect, useRef } from 'react';

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
  minutesPerStep = 15,
  onChange,
  from,
  to,
  value = '00:00',
}: TimePickerProps) => {
  const [durationValue, setDurationValue] = useState(value);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { hours, minutes } = parseTime(durationValue);

  const inputRef = useRef<HTMLInputElement>(null);
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

  const handleHoursChange: (delta: number) => string = (delta) =>
    handleMinutesChange(60 * delta);

  const handleMinutesChange: (delta: number) => string = (delta) => {
    const nextValue = addOrSubtractMinutes(durationValue, delta, from, to);

    if (nextValue !== durationValue) {
      setDurationValue(nextValue);
    }

    return nextValue;
  };

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <Input
        ref={inputRef}
        onChange={onChange}
        onFocus={handleFocus}
        disableUnderline
        value={durationValue}
      />
      {dialogOpen && (
        <TimePickerDialog ref={dialogRef} tabIndex={1} onBlur={closeDialog}>
          <TimePickerBlock
            number={`${hours}`}
            onDownClick={() => handleHoursChange(-1)}
            onUpClick={() => handleHoursChange(1)}
          />
          :
          <TimePickerBlock
            number={`${minutes}`}
            onDownClick={() => handleMinutesChange(-minutesPerStep)}
            onUpClick={() => handleMinutesChange(+minutesPerStep)}
          />
        </TimePickerDialog>
      )}
    </div>
  );
};

export default TimePicker;

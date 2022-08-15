import { Input } from 'legos';
import React, { useState, useEffect, useRef, ChangeEvent } from 'react';

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
  const [dialogOpen, setDialogOpen] = useState(false);

  const { hours, minutes } = parseTime(value);

  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    addDOMEvents();
    ensureValueInRange();
    return removeDOMEvents;
  }, []);

  const addDOMEvents = () => {
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleDocumentKeyPress);
    if (inputRef && inputRef.current)
      inputRef.current.addEventListener('keydown', handleDocumentKeyPress);
  };

  const removeDOMEvents = () => {
    document.removeEventListener('click', handleDocumentClick);
    document.removeEventListener('keydown', handleDocumentKeyPress);
    if (inputRef && inputRef.current)
      inputRef.current.removeEventListener('keydown', handleDocumentKeyPress);
  };

  const ensureValueInRange = () => handleMinutesChange(0);

  const closeDialog = () => {
    if (!dialogOpen) return;

    const nextValue = ensureValueInRange();

    setDialogOpen(false);
    onChange(nextValue);
  };

  const openDialog = () => {
    if (dialogOpen) return;

    setDialogOpen(true);
  };

  const handleDocumentKeyPress = (event: any) => {
    if (event.key !== 'Tab') return;

    closeDialog();
  };

  const handleDocumentClick = (event: any) => {
    const element = event.target;

    if (!dialogRef || !inputRef || !(element instanceof Node)) return;
    if (
      (dialogRef && dialogRef.current && dialogRef.current.contains(element)) ||
      (inputRef && inputRef.current && inputRef.current.contains(element))
    )
      return;

    closeDialog();
  };

  const handleFocus = (event: ChangeEvent) => {
    openDialog();
  };

  const handleHoursChange: (delta: number) => string = (delta) =>
    handleMinutesChange(60 * delta);

  const handleMinutesChange: (delta: number) => string = (delta) => {
    const nextValue = addOrSubtractMinutes(value, delta, from, to);

    // if (nextValue !== value) onChange(nextValue);

    return nextValue;
  };

  const handleWheel = (event: any) => {
    const delta = event.deltaY > 0 ? +minutesPerStep : -minutesPerStep;

    event.preventDefault();

    handleMinutesChange(delta);
  };

  return (
    <div>
      <Input
        ref={inputRef}
        onChange={onChange}
        onFocus={handleFocus}
        disableUnderline
        onTouchMove={handleWheel}
        onWheel={handleWheel}
        value={value}
      />
      {dialogOpen && (
        <TimePickerDialog
          ref={dialogRef}
          onTouchMove={handleWheel}
          onWheel={handleWheel}
        >
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

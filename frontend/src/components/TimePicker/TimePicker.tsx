import React, {
  useState,
  useEffect,
  useRef,
  cloneElement,
  Children,
} from 'react';

import TimepickerDialog, { TimepickerBlock } from './TimepickerDialog';
import { addOrSubtractMinutes, parseTime } from './utils';

interface TimePickerProps {
  children: JSX.Element;
  from?: string;
  minutesPerStep?: number;
  onBlur?: () => void;
  onChange?: () => void;
  onFocus?: () => void;
  to?: string;
  value: string;
}

const TimePicker = ({
  children,
  minutesPerStep = 15,
  onBlur,
  onChange,
  onFocus,
  from,
  to,
  value = '00:00',
}: TimePickerProps) => {
  const { dialogOpen, setDialogOpen } = useState();

  const { hours, minutes } = parseTime(value);

  const inputRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    addDOMEvents();
    ensureValueInRange();
    return removeDOMEvents;
  }, []);

  const addDOMEvents = () => {
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleDocumentKeyPress);
    if (inputRef) inputRef.addEventListener('keydown', handleDocumentKeyPress);
  };

  const removeDOMEvents = () => {
    document.removeEventListener('click', handleDocumentClick);
    document.removeEventListener('keydown', handleDocumentKeyPress);
    if (inputRef)
      inputRef.removeEventListener('keydown', handleDocumentKeyPress);
  };

  const ensureValueInRange = () => handleMinutesChange(0);

  const closeDialog = () => {
    if (!dialogOpen) return;

    const nextValue = ensureValueInRange();

    setDialogOpen(false);
    onBlur(nextValue);
  };

  const openDialog = () => {
    if (dialogOpen) return;

    setDialogOpen(true);
  };

  const handleDocumentKeyPress = (event) => {
    if (event.key !== 'Tab') return;

    closeDialog();
  };

  const handleDocumentClick = (event) => {
    const element = event.target;

    if (!dialogRef || !inputRef || !(element instanceof Node)) return;
    if (dialogRef.contains(element) || inputRef.contains(element)) return;

    closeDialog();
  };

  const handleChange = (event) => onChange(event.target.value || '');

  const handleFocus = (event) => {
    onFocus(event);
    openDialog();
  };

  const handleHoursChange = (delta) => handleMinutesChange(60 * delta);

  const handleMinutesChange = (delta) => {
    const nextValue = addOrSubtractMinutes(value, delta, { from, to });

    if (nextValue !== value) onChange(nextValue);

    return nextValue;
  };

  const handleWheel = (event) => {
    const delta = event.deltaY > 0 ? +minutesPerStep : -minutesPerStep;

    event.preventDefault();

    handleMinutesChange(delta);
  };

  return (
    <div>
      {cloneElement(Children.only(children), {
        ref: inputRef,
        onBlur,
        onChange: handleChange,
        onFocus: handleFocus,
        onTouchMove: handleWheel,
        onWheel: handleWheel,
        value,
      })}
      {dialogOpen && (
        <TimepickerDialog
          innerRef={dialogRef}
          onTouchMove={handleWheel}
          onWheel={handleWheel}
        >
          <TimepickerBlock
            number={hours}
            onDownClick={() => handleHoursChange(-1)}
            onUpClick={() => handleHoursChange(1)}
          />
          :
          <TimepickerBlock
            number={minutes}
            onDownClick={() => handleMinutesChange(-minutesPerStep)}
            onUpClick={() => handleMinutesChange(+minutesPerStep)}
          />
        </TimepickerDialog>
      )}
    </div>
  );
};

export default TimePicker;

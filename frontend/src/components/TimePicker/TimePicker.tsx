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
import { IMaskInput } from 'react-imask';

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

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="00:00"
        definitions={{
          '0': /[0-9]/,
        }}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
      />
    );
  }
);

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
  const [initialDurationValue, setInitialDurationValue] =
    useState(durationValue);
  const [timePickerBlurCount, setTimePickerBlurCount] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [blockScroll, allowScroll] = useScrollBlock();

  const { hours, minutes } = parseTime(durationValue);

  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDurationValue(toHoursAndMinutes(value));
  }, [value]);

  useEffect(() => {
    if (timePickerBlurCount === 0) {
      return;
    }
    closeDialog();
  }, [timePickerBlurCount]);

  useEffect(() => {
    if (!dialogOpen) {
      dialogRef.current?.focus();
    }
  }, [dialogOpen]);

  const closeDialog = () => {
    if (durationValue === initialDurationValue) {
      setDialogOpen(false);
      onChange(hoursAndMinutesToMinutes(hours, minutes));
      return;
    }

    onChange(hoursAndMinutesToMinutes(hours, minutes), true);
    if (!dialogOpen) {
      return;
    }

    setInitialDurationValue(durationValue);
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
    setDurationValue(value);
    const { hours, minutes } = parseTime(value);
    onChange(hoursAndMinutesToMinutes(hours, minutes));
  };

  const handlerTimePickerClick = (event: Event) => {
    const isTimePickerFocus = (event.target as HTMLInputElement).closest(
      'div #TimePicker'
    );

    if (!isTimePickerFocus && dialogOpen) {
      allowScroll();
      setTimePickerBlurCount(timePickerBlurCount + 1);
      document.removeEventListener('click', handlerTimePickerClick);
    }

    if (isTimePickerFocus) {
      blockScroll();
    }
  };

  document.addEventListener('click', handlerTimePickerClick);

  return (
    <Box width={width ?? '100%'} sx={sx} position="relative" id="TimePicker">
      <FormControl fullWidth error={error}>
        <Input
          disabled={disabled}
          onChange={(value) => handleOnChange(`${value.target.value}`)}
          onFocus={handleFocus}
          value={durationValue}
          name={name}
          error={error}
          InputProps={{
            readOnly: false,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            inputComponent: TextMaskCustom as any,
            endAdornment: (
              <InputAdornment position="end">
                <HourglassBottomIcon />
              </InputAdornment>
            ),
          }}
        />

        {error && <FormHelperText>{helperText}</FormHelperText>}
        {dialogOpen && (
          <TimePickerDialog ref={dialogRef}>
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
      </FormControl>
    </Box>
  );
};

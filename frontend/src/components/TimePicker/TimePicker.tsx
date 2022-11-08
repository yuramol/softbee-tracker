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

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="00:00"
        definitions={{
          '0': /[0-9]/,
        }}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
      />
    );
  }
);

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
  const [initialDurationValue, setInitialDurationValue] =
    useState(durationValue);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [blockScroll, allowScroll] = useScrollBlock();
  const [click, setClick] = useState(0);

  const { hours, minutes } = parseTime(durationValue);

  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    blockScroll();
    return () => allowScroll();
  }, []);

  useEffect(() => {
    setDurationValue(toHoursAndMinutes(value));
  }, [value]);

  useEffect(() => {
    if (click === 0) {
      return;
    }
    closeDialog();
  }, [click]);

  useEffect(() => {
    if (!dialogOpen) {
      dialogRef.current?.focus();
    }
  }, [dialogOpen]);

  const closeDialog = () => {
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

  console.log(dialogOpen);

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

  let isTimePickerFocus = false;

  document.addEventListener('click', (event) => {
    const target = (event.target as HTMLInputElement).id;

    if (target !== 'TimePicker' && isTimePickerFocus) {
      isTimePickerFocus = false;
      setClick(click + 1);
    }

    if (target === 'TimePicker') {
      isTimePickerFocus = true;
    }
  });

  return (
    <Box width={width ?? '100%'} sx={sx} position="relative" id="TimePicker">
      <FormControl fullWidth error={error} id="TimePicker">
        <Input
          id="TimePicker"
          disabled={disabled}
          onChange={(value) => handleOnChange(`${value.target.value}`)}
          onFocus={handleFocus}
          value={durationValue}
          name={name}
          error={error}
          InputProps={{
            id: 'TimePicker',
            readOnly: false,
            inputComponent: TextMaskCustom as any,
            endAdornment: (
              <InputAdornment
                id="TimePicker"
                position="end"
                onClick={openDialog}
              >
                <HourglassBottomIcon id="TimePicker" />
              </InputAdornment>
            ),
          }}
        />

        {error && <FormHelperText>{helperText}</FormHelperText>}
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
      </FormControl>
    </Box>
  );
};

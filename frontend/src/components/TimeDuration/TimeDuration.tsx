import React from 'react';
import {
  FormControl,
  FormHelperText,
  OutlinedInput,
  SxProps,
  Theme,
} from '@mui/material';
import { TimeDurationInput } from 'react-time-duration-input';
import { Box } from '@mui/system';

interface TimeDurationProps {
  sx?: SxProps<Theme>;
  disabled?: boolean;
  value: number;
  onChange: (value: number) => void;
  error?: boolean;
  name?: string;
  helperText?: string;
}

export const TimeDuration = ({
  disabled,
  value = 0,
  onChange,
  error = false,
  name,
  helperText,
  sx,
}: TimeDurationProps) => {
  const handleChange = () => {};
  return (
    <FormControl sx={sx} fullWidth error={error}>
      <OutlinedInput
        disabled={disabled}
        value={value}
        name={name}
        onChange={handleChange}
        components={{
          Input: (
            <Box>
              <TimeDurationInput
                disabled={disabled}
                value={value}
                scale="m"
                name={name}
                onChange={onChange}
              />
            </Box>
          )
        }}
      />
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

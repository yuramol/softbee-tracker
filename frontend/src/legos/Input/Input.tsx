import React, { ChangeEvent } from 'react';
import { TextField } from '@mui/material';
import styled from 'styled-components';

const StyledInput = styled(({ ...otherProps }) => (
  <TextField {...otherProps} />
))`
  & .css-ochvjn-MuiFormLabel-root-MuiInputLabel-root.Mui-disabled {
    color: #6c757d;
    font-size: 16px;
  }
  & .css-1x51dt5-MuiInputBase-input-MuiInput-input.Mui-disabled {
    -webkit-text-fill-color: black;
  }
`;

type InputProps = {
  disableUnderline?: boolean;
  disabled?: boolean;
  value: string;
  label?: string;
  variant?: string;
  type?: string;
  onChange: (value: string) => void;
  fullWidth?: boolean;
  error?: any;
};

export const Input = ({
  disableUnderline,
  disabled,
  value,
  label,
  type,
  onChange,
  variant,
  fullWidth,
  error,
}: InputProps) => (
  <StyledInput
    InputProps={{
      disableUnderline: disableUnderline,
    }}
    variant={variant}
    disabled={disabled}
    fullWidth={fullWidth}
    value={value}
    label={label}
    type={type}
    onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
    error={error}
  />
);

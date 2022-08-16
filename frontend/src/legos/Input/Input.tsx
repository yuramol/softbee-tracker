import React from 'react';

import { StyledInput } from './styled';
import { InputProps } from './types';

export const Input = ({
  label,
  size,
  onChange,
  helperText = false,
  ...props
}: InputProps) => (
  <StyledInput
    onChange={({ target: { value } }) => onChange(value)}
    error={helperText ? true : false}
    label={label}
    size={size}
    fullWidth
    {...props}
  />
);

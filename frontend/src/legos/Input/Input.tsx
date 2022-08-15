import React from 'react';

import { InputProps } from './types';
import { StyledInput } from './styled';

export const Input = ({
  disableUnderline = false,
  label,
  size,
  onChange,
  ...props
}: InputProps) => {
  const { InputProps, variant } = props;
  const TextFieldInputProps =
    variant === 'outlined' ? InputProps : { disableUnderline, ...InputProps };
  return (
    <StyledInput
      {...props}
      InputProps={TextFieldInputProps}
      onChange={({ target: { value } }) => onChange(value)}
      label={label}
      size={size}
      fullWidth
    />
  );
};

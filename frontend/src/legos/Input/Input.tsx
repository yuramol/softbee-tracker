import React from 'react';

import TextField, { TextFieldProps } from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

type InputProps = TextFieldProps & {
  disableUnderline?: boolean;
  onChange: (value: string) => void;
};

const StyledInput = styled(TextField)((props) => ({
  '& label': {
    fontSize: '16px',
    color: props.disabled ? '#6c757d !important' : 'inherit',
  },
  '& .css-1x51dt5-MuiInputBase-input-MuiInput-input.Mui-disabled': {
    '-webkit-text-fill-color': 'black',
  },
}));

export const Input = ({
  disableUnderline = false,
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
    />
  );
};

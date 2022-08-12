import React from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
} from '@mui/material';

import { SelectPropsType } from './types';
import { Icon } from '../Icon';
import { StyledSelect } from './styled';

export const Select = ({
  name,
  items,
  label,
  disabled,
  value,
  error,
  errorText,
  onChange,
  variant = 'standard',
  readOnly,
  IconComponent = () => <Icon icon="arrowDropDown" />,
  ...props
}: SelectPropsType) => {
  console.log('===', value, items);
  return (
    <FormControl variant={variant} fullWidth error={error}>
      <InputLabel id="select-label">{label}</InputLabel>
      <StyledSelect
        IconComponent={IconComponent}
        label={label}
        value={value}
        name={name}
        disabled={disabled}
        readOnly={readOnly}
        onChange={onChange}
        sx={{ maxWidth: '100%', paddingRight: 1 }}
        {...props}
      >
        {items?.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </StyledSelect>
      {error && <FormHelperText>{errorText}</FormHelperText>}
    </FormControl>
  );
};

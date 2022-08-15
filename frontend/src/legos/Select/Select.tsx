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
  error,
  errorText,
  variant = 'standard',
  IconComponent = () => <Icon icon="arrowDropDown" />,
  ...props
}: SelectPropsType) => (
  <FormControl variant={variant} fullWidth error={error}>
    <InputLabel id="select-label">{label}</InputLabel>
    <StyledSelect
      label={label}
      IconComponent={IconComponent}
      name={name}
      sx={{ maxWidth: '100%', paddingRight: 1 }}
      {...props}
    >
      {items?.map(({ label, value }) => (
        <MenuItem key={value} value={value as string}>
          {label}
        </MenuItem>
      ))}
    </StyledSelect>
    {error && <FormHelperText>{errorText}</FormHelperText>}
  </FormControl>
);

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
  items,
  label,
  error,
  helperText,
  variant = 'standard',
  IconComponent = () => <Icon icon="arrowDropDown" />,
  ...props
}: SelectPropsType) => (
  <FormControl variant={variant} fullWidth error={error}>
    <InputLabel>{label}</InputLabel>
    <StyledSelect
      label={label}
      IconComponent={IconComponent}
      sx={{ paddingRight: 1 }}
      {...props}
    >
      {items?.map(({ label, value }) => (
        <MenuItem key={value} value={value as string}>
          {label}
        </MenuItem>
      ))}
    </StyledSelect>
    {error && <FormHelperText>{helperText}</FormHelperText>}
  </FormControl>
);

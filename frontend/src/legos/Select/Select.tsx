import React from 'react';
import { FormControl, InputLabel, MenuItem } from '@mui/material';

import { SelectPropsType } from './types';
import { Icon } from '../Icon';
import { StyledSelect } from './styled';

export const Select = ({
  items,
  label,
  disabled,
  value,
  disableUnderline = false,
  onChange,
  variant = 'standard',
  readOnly,
  IconComponent = () => <Icon icon="arrowDropDown" />,
}: SelectPropsType) => (
  <FormControl variant={variant} fullWidth>
    <InputLabel id="select-label">{label}</InputLabel>
    <StyledSelect
      IconComponent={IconComponent}
      disableUnderline={disableUnderline}
      label={label}
      value={value}
      disabled={disabled}
      readOnly={readOnly}
      onChange={({ target: { value } }) => onChange(value)}
      sx={{ maxWidth: '100%', paddingRight: 1 }}
    >
      {items.map((item) => (
        <MenuItem key={item.label} value={item.label}>
          {item.label}
        </MenuItem>
      ))}
    </StyledSelect>
  </FormControl>
);

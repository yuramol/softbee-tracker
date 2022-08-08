import React, { ChangeEvent } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from '@mui/material';
import styled from 'styled-components';

import { SelectProps } from './types';
import { Icon } from 'legos/Icon';

const StyledSelect = styled(({ ...otherProps }) => (
  <MuiSelect {...otherProps} />
))`
  &
    .css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input.Mui-disabled {
    -webkit-text-fill-color: ${(props) => props.colordisabledvalue};
  }
`;

export const Select = ({
  items,
  label,
  disabled,
  value,
  disableUnderline = false,
  onChange,
  variant = 'standard',
  colorDisabledValue,
  IconComponent = () => <Icon icon="arrowDropDown" />,
}: SelectProps) => (
  <FormControl variant={variant} fullWidth>
    <InputLabel id="select-label">{label}</InputLabel>
    <StyledSelect
      colordisabledvalue={colorDisabledValue}
      IconComponent={IconComponent}
      disableUnderline={disableUnderline}
      disabled={disabled}
      label={label}
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
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

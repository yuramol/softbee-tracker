import React, { ReactElement } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { ArrowDropDown } from '@mui/icons-material';

export type ItemType = { label: string };
type ModalSelectProps = {
  items: ItemType[];
  label: string;
  disabled?: boolean;
  value?: string;
  disableUnderline?: boolean;
  onChange: (value: string) => void;
  variant?: 'standard' | 'outlined' | 'filled' | undefined;
  IconComponent?: () => ReactElement<any, any> | null;
};

export const ModalSelect = ({
  items,
  label,
  disabled,
  value,
  disableUnderline = false,
  onChange,
  variant = 'standard',
  IconComponent = () => <ArrowDropDown />,
}: ModalSelectProps) => {
  return (
    <FormControl variant={variant} fullWidth>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        IconComponent={IconComponent}
        disableUnderline={disableUnderline}
        disabled={disabled}
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{ maxWidth: '100%', padingRight: 2 }}
      >
        {items.map((item) => (
          <MenuItem key={item.label} value={item.label}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

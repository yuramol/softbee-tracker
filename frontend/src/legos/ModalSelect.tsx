import * as React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
type ItemType = { label: string; value: string };
type ModalSelectProps = {
  items: ItemType[];
  label: string;
};
export const ModalSelect = ({ items, label }: ModalSelectProps) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select label={label} sx={{ width: 'auto', marginRight: 2 }}>
        {items.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useFormikContext } from 'formik';

type ItemType = { label: string };
type ModalSelectProps = {
  items: ItemType[];
  label: string;
  id: string;
  name: string;
  size: 'small' | 'medium' | undefined;
};

export const ModalSelect = ({ items, label, name, size }: ModalSelectProps) => {
  const { handleChange } = useFormikContext();

  return (
    <FormControl fullWidth sx={{ marginTop: 2 }} size={size}>
      <InputLabel id='select-label'>{label}</InputLabel>
      <Select
        name={name}
        label={label}
        onChange={handleChange}
        sx={{ width: 'auto' }}
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

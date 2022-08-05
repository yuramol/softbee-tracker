import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useFormikContext } from 'formik';

type ItemType = { id: number; label: string };
type ModalSelectProps = {
  items: ItemType[];
  label: string;
  name: string;
};

export const SelectField = ({ items, label, name }: ModalSelectProps) => {
  const { handleChange } = useFormikContext();

  return (
    <FormControl fullWidth>
      <InputLabel id="select-label">{label}</InputLabel>
      <Select
        name={name}
        label={label}
        onChange={handleChange}
        sx={{ width: 'auto' }}
      >
        {items.map(({ id, label }) => (
          <MenuItem key={label} value={id}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

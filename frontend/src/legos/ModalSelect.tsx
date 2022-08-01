import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

type ItemType = { label: string };
type ModalSelectProps = {
  items: ItemType[];
  label: string;
  id: string;
};

export const ModalSelect = ({ items, label }: ModalSelectProps) => {
  const [project, setProject] = useState('');
  const handleChange = (e: SelectChangeEvent) => {
    setProject(e.target.value);
  };
  return (
    <FormControl fullWidth sx={{ marginTop: 2 }}>
      <InputLabel id='demo-simple-select-label'>{label}</InputLabel>
      <Select
        label={label}
        value={project}
        sx={{ width: 'auto' }}
        onChange={handleChange}
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

import * as React from 'react';
import { getInitials } from 'utils';

import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  Chip,
  OutlinedInput,
  SelectProps,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';

type MultipleSelectProps = SelectProps & {
  items: string[];
  value: string[];
  onChange: (value: any) => void;
};

export const MultipleSelect = ({
  items,
  value,
  onChange,
  ...props
}: MultipleSelectProps) => {
  const { label } = props;

  const handleChange = (event: SelectChangeEvent<typeof value>) => {
    const { target } = event;
    onChange(
      typeof target.value === 'string' ? target.value.split(',') : target.value
    );
  };

  return (
    <div>
      <FormControl sx={{ maxWidth: '200px', minWidth: '200px' }} size="small">
        <InputLabel> {label}</InputLabel>
        <Select
          label={label}
          multiple
          value={value}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  sx={{ height: '20px' }}
                  key={value}
                  label={getInitials(value)}
                />
              ))}
            </Box>
          )}
        >
          {items.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

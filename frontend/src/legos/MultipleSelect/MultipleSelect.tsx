import * as React from 'react';
import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  Chip,
  OutlinedInput,
  FormControl,
  FormHelperText,
} from '@mui/material';

import { Icon } from '../Icon';
import { MultipleSelectProps } from './types';

export const MultipleSelect = ({
  label,
  items,
  size,
  sx,
  error,
  helperText,
  variant = 'standard',
  IconComponent = () => <Icon icon="arrowDropDown" />,
  ...props
}: MultipleSelectProps) => (
  <FormControl variant={variant} size={size} sx={sx} fullWidth error={error}>
    {label && <InputLabel>{label}</InputLabel>}
    <Select
      label={label}
      multiple
      input={<OutlinedInput label={label} />}
      renderValue={(selected) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {(selected as string[]).map((value) => (
            <Chip
              sx={{ height: '20px' }}
              key={value}
              label={items?.find((i) => i.value === value)?.label}
            />
          ))}
        </Box>
      )}
      sx={{ paddingRight: 1 }}
      IconComponent={IconComponent}
      {...props}
    >
      {items?.map(({ label, value }) => (
        <MenuItem key={value} value={value as string}>
          {label}
        </MenuItem>
      ))}
    </Select>
    {helperText && <FormHelperText>{helperText}</FormHelperText>}
  </FormControl>
);

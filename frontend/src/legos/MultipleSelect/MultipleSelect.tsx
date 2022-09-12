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
  Stack,
  SelectChangeEvent,
} from '@mui/material';

import { Icon } from '../Icon';
import { MultipleSelectProps } from './types';
import { ReactNode, SetStateAction } from 'react';

export const MultipleSelect = ({
  label,
  items,
  size,
  sx,
  error,
  helperText,
  variant = 'standard',
  setValue,
  ...props
}: MultipleSelectProps) => {
  const [isSelected, setIsSelected] = React.useState(false);

  React.useEffect(() => {
    if ((props as { value: [] }).value.length === 0) {
      setIsSelected(false);
    }
    if ((props as { value: [] }).value.length > 0) {
      setIsSelected(true);
    }
  }, [props.value]);

  const handleChange: (
    event: SelectChangeEvent<unknown>,
    child: ReactNode
  ) => void = (event) => {
    setValue?.(event.target.value as SetStateAction<string[]>);
  };

  const handleDelete = (value: string) => {
    setValue?.(
      (props as { value: [] }).value.filter((id: string) => id !== value)
    );
  };

  return (
    <FormControl variant={variant} size={size} sx={sx} fullWidth error={error}>
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        label={label}
        multiple
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {(selected as string[]).map((value) => (
              <Chip
                sx={{
                  height: '20px',
                  '& .MuiChip-deleteIcon': {
                    fontSize: '15px',
                  },
                }}
                key={value}
                label={items?.find((i) => i.value === value)?.label}
                onMouseDown={(event) => {
                  event.stopPropagation();
                }}
                onDelete={() => handleDelete(value)}
                deleteIcon={<Icon icon="clear" />}
              />
            ))}
          </Box>
        )}
        IconComponent={() => (
          <>
            {isSelected ? (
              <Stack
                onClick={(event) => {
                  event.stopPropagation();
                  setValue?.([]);
                }}
                sx={{
                  cursor: 'pointer',
                  paddingRight: 1,
                }}
              >
                <Icon icon="clear" />
              </Stack>
            ) : (
              <Stack
                sx={{
                  cursor: 'pointer',
                  paddingRight: 1,
                  position: 'absolute !important',
                  right: '0 !important',
                  pointerEvents: 'none !important',
                }}
              >
                <Icon icon="arrowDropDown" />
              </Stack>
            )}
          </>
        )}
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
};

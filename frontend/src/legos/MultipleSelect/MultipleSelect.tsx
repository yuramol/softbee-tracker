import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  Chip,
  OutlinedInput,
  FormControl,
  FormHelperText,
  SelectChangeEvent,
  IconButton,
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
  handleClear,
  handleClearItem,
  ...props
}: MultipleSelectProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const values = (props as { value: [] }).value;

  useEffect(() => {
    if (values.length === 0) {
      setIsSelected(false);
    }
    if (values.length > 0) {
      setIsSelected(true);
    }
  }, [props.value]);

  const handleChange: (
    event: SelectChangeEvent<unknown>,
    child: ReactNode
  ) => void = (event) => {
    setValue?.(event.target.value as SetStateAction<string[]>);
  };

  const handleDelete = (item: string) => {
    setValue?.(values.filter((id: string) => id !== item));
  };

  return (
    <FormControl variant={variant} size={size} sx={sx} fullWidth error={error}>
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        label={label}
        multiple
        value={values}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={() =>
          values.length > 0 ? (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 0.5,
                width: '100%',
              }}
            >
              {values.map((item) => (
                <Chip
                  sx={{
                    height: '20px',
                    '& .MuiChip-deleteIcon': {
                      fontSize: '15px',
                    },
                  }}
                  key={item}
                  label={items?.find((i) => i.value === item)?.label}
                  onDelete={() =>
                    handleClearItem ? handleClearItem(item) : handleDelete(item)
                  }
                  onMouseDown={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                  deleteIcon={<Icon icon="clear" />}
                />
              ))}
            </Box>
          ) : null
        }
        IconComponent={() => (
          <>
            {isSelected ? (
              <IconButton
                onClick={() => {
                  if (handleClear) {
                    handleClear();
                  } else {
                    setValue?.([]);
                  }
                }}
              >
                <Icon icon="clear" size="small" />
              </IconButton>
            ) : (
              <IconButton
                sx={{
                  position: 'absolute !important',
                  right: '0 !important',
                  pointerEvents: 'none !important',
                }}
              >
                <Icon icon="arrowDropDown" />
              </IconButton>
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

import React from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useFormikContext } from 'formik';
import { ProjectEntity } from 'types/GraphqlTypes';

type ModalSelectProps = {
  items: ProjectEntity[] | undefined;
  label: string;
  name: string;
  value: string;
  error: boolean | string | undefined;
};

export const SelectField = ({
  items,
  label,
  name,
  value,
  error,
}: ModalSelectProps) => {
  const { handleChange } = useFormikContext();

  return (
    <FormControl fullWidth error={!!error}>
      <InputLabel id="select-label">{label}</InputLabel>
      <Select
        name={name}
        label={label}
        value={value}
        onChange={handleChange}
        sx={{ width: 'auto' }}
      >
        {items?.map(({ id, attributes }) => (
          <MenuItem key={id} value={id as string}>
            {attributes?.name}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

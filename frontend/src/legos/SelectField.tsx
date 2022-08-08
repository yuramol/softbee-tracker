import React, { useState } from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useFormikContext } from 'formik';
import { ProjectEntity } from 'types/GraphqlTypes';

type ModalSelectProps = {
  items: ProjectEntity[] | undefined;
  label: string;
  name: string;
  error: boolean | string | undefined;
};

export const SelectField = ({
  items,
  label,
  name,
  error,
}: ModalSelectProps) => {
  const { handleChange } = useFormikContext();

  const [value, setValue] = useState('');

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
    handleChange(event);
  };

  return (
    <FormControl fullWidth error={!!error}>
      <InputLabel id="select-label">{label}</InputLabel>
      <Select
        name={name}
        label={label}
        value={value}
        onChange={(e) => handleChangeSelect(e)}
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

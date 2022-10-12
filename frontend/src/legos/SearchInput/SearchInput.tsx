import React, { useState, useEffect } from 'react';
import { FormControl, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

import { useDebounce } from 'hooks';
import { SearchInputProps } from './types';
import { Input } from 'legos';

export const SearchInput = ({
  label,
  size,
  delay = 500,
  onChange,
  ...props
}: SearchInputProps) => {
  const { value } = props;
  const [searchValue, setSearchValue] = useState(value);

  const debouncedSearchText = useDebounce(searchValue as string, delay);
  useEffect(() => {
    onChange(debouncedSearchText);
  }, [debouncedSearchText, onChange]);

  return (
    <FormControl sx={{ width: '25ch', flexGrow: 1 }}>
      <Input
        {...props}
        label={label}
        size={size}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        type="search"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
};

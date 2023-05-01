import React, { Dispatch, SetStateAction } from 'react';
import { Box, IconButton } from '@mui/material';
import { Select } from 'legos';
import { employeePositionChoices } from 'constant';
import ClearIcon from '@mui/icons-material/Clear';
import { useRoles } from 'hooks';
import { Stack } from '@mui/system';
type CrewFiltersProps = {
  roleFilter: string;
  setRoleFilter: Dispatch<SetStateAction<string>>;
  positionFilter: string;
  setPositionFilter: Dispatch<SetStateAction<string>>;
};

export const statusItem = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Archived', value: 'archived' },
];

export const CrewFilters = ({
  roleFilter,
  setRoleFilter,
  positionFilter,
  setPositionFilter,
}: CrewFiltersProps) => {
  const { rolesChoices } = useRoles();
  const handleOnChange = (value: string) => {
    setRoleFilter(value);
  };
  const handleOnPositionChange = (value: string) => {
    setPositionFilter(value);
  };
  const resetRolesFilters = () => {
    setRoleFilter('');
  };
  const resetPositionFilters = () => {
    setPositionFilter('');
  };
  return (
    <Stack direction="row" gap={3}>
      <Box width="600px" display="flex">
        <Select
          endAdornment={
            <IconButton
              sx={{ display: roleFilter ? '' : 'none' }}
              onClick={resetRolesFilters}
            >
              <ClearIcon />
            </IconButton>
          }
          sx={{ width: '80%' }}
          label="Role"
          variant="outlined"
          items={rolesChoices}
          value={roleFilter}
          onChange={(value) => handleOnChange(`${value.target.value}`)}
        />
        <Select
          endAdornment={
            <IconButton
              sx={{ display: positionFilter ? '' : 'none' }}
              onClick={resetPositionFilters}
            >
              <ClearIcon />
            </IconButton>
          }
          sx={{ width: '80%' }}
          label="Position"
          variant="outlined"
          items={employeePositionChoices}
          value={positionFilter}
          onChange={(value) => handleOnPositionChange(`${value.target.value}`)}
        />
      </Box>
    </Stack>
  );
};

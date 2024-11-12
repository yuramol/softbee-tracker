import React from 'react';
import { ButtonGroup, Stack } from '@mui/material';

import { useNormalizedUsers } from 'hooks';
import { Button, MultipleSelect, SearchInput } from 'legos';

type ProjectFiltersProps = {
  searchFilter: string;
  managerFilter: string[];
  statusFilter: string;
  onSearchFilterChange: (value: string) => void;
  onManagerFilterChange: (value: string[]) => void;
  onStatusFilterChange: (value: string) => void;
};

export const statusItem = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Archived', value: 'archived' },
];

export const ProjectFilters = ({
  searchFilter,
  managerFilter,
  statusFilter,
  onSearchFilterChange,
  onManagerFilterChange,
  onStatusFilterChange,
}: ProjectFiltersProps) => {
  const { managersChoices } = useNormalizedUsers();

  return (
    <Stack width="100%" flexDirection="row" flexWrap="wrap" gap={3}>
      <SearchInput
        sx={{ flexGrow: '1' }}
        value={searchFilter}
        size="small"
        label="Search..."
        onChange={(value) => onSearchFilterChange(value as string)}
      />
      <MultipleSelect
        label="Project manager"
        variant="outlined"
        size="small"
        sx={{ width: { xs: '100%', sm: 200 } }}
        items={managersChoices}
        value={managerFilter}
        setValue={(value) => onManagerFilterChange(value as string[])}
      />
      <ButtonGroup size="small" variant="outlined" sx={{ height: '40px' }}>
        {statusItem.map(({ label, value }) => (
          <Button
            sx={{ width: '90px' }}
            title={label}
            key={value}
            onClick={() => onStatusFilterChange(value)}
            variant={statusFilter === value ? 'contained' : 'outlined'}
          />
        ))}
      </ButtonGroup>
    </Stack>
  );
};

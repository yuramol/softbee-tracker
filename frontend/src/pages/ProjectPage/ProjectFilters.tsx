import React, { useState } from 'react';
import { ButtonGroup } from '@mui/material';
import { Button, MultipleSelect } from 'legos';
import { SearchInput } from 'legos/SearchInput';
import { useNormalizedUsers } from 'hooks';

type ProjectFiltersProps = {
  searchProject: string;
  searchManagers: string[];
  setSearchProject: React.Dispatch<React.SetStateAction<string>>;
  setSearchManagers: React.Dispatch<React.SetStateAction<string[]>>;
  setSearchStatus: React.Dispatch<React.SetStateAction<string[]>>;
};

export const statusItem = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Archived', value: 'archived' },
];

export const ProjectFilters = ({
  searchProject,
  searchManagers,
  setSearchProject,
  setSearchManagers,
  setSearchStatus,
}: ProjectFiltersProps) => {
  const { managersChoices } = useNormalizedUsers();
  const [activeStatus, setActiveStatus] = useState(statusItem[0]);

  const handleClickStatusButton = (index: number) => {
    setActiveStatus(statusItem[index]);
    index === 0
      ? setSearchStatus(statusItem.map(({ value }) => value))
      : setSearchStatus([statusItem[index].value]);
  };

  return (
    <>
      <SearchInput
        sx={{ flexGrow: '1' }}
        value={searchProject}
        size="small"
        label="Search..."
        onChange={(value) => setSearchProject(value as string)}
      />
      <MultipleSelect
        label="Project manager"
        variant="outlined"
        size="small"
        sx={{ width: 200 }}
        items={managersChoices}
        value={searchManagers}
        setValue={setSearchManagers}
      />
      <ButtonGroup size="small" variant="outlined" sx={{ height: '40px' }}>
        {statusItem.map(({ label, value }, index) => (
          <Button
            sx={{ width: '90px' }}
            title={label}
            key={value}
            onClick={() => handleClickStatusButton(index)}
            variant={activeStatus.value === value ? 'contained' : 'outlined'}
          />
        ))}
      </ButtonGroup>
    </>
  );
};

import React, { useEffect, useState } from 'react';
import { ButtonGroup } from '@mui/material';
import { Button, MultipleSelect } from 'legos';
import { SearchInput } from 'legos/SearchInput';
import { useNormalizedUsers } from 'hooks';
import { Maybe } from 'types/GraphqlTypes';

type ProjectFiltersProps = {
  setStatus: (status: string[]) => void;
  setSearchProjects: React.Dispatch<React.SetStateAction<string>>;
  searchProjects: string;
  setSelectedManager: React.Dispatch<React.SetStateAction<string[]>>;
};

export const filterItem = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Archived', value: 'archived' },
];

export const ProjectFilters = ({
  setStatus,
  setSearchProjects,
  searchProjects,
  setSelectedManager,
}: ProjectFiltersProps) => {
  const [active, setActive] = useState(filterItem[0]);
  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  const { managersChoices } = useNormalizedUsers();
  const handleClickButton = (index: number) => {
    setActive(filterItem[index]);

    index === 0
      ? setStatus(filterItem.map(({ value }) => value))
      : setStatus([filterItem[index].value]);
  };
  setSelectedManager(selectedItem);

  return (
    <>
      <SearchInput
        sx={{ flexGrow: '1' }}
        value={searchProjects}
        size="small"
        label={'Search...'}
        onChange={(value) => setSearchProjects(value as string)}
      />
      <MultipleSelect
        label="Project manager"
        variant="outlined"
        size="small"
        sx={{ width: 200 }}
        items={managersChoices}
        value={selectedItem}
        onChange={(e) => setSelectedItem(e.target.value as string[])}
      />
      <ButtonGroup size="small" variant="outlined" sx={{ height: '40px' }}>
        {filterItem.map(({ label, value }, index) => (
          <Button
            sx={{ width: '90px' }}
            title={label}
            key={value}
            onClick={() => handleClickButton(index)}
            variant={active.value === value ? 'contained' : 'outlined'}
          />
        ))}
      </ButtonGroup>
    </>
  );
};

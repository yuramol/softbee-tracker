import React, { useState } from 'react';
import { ButtonGroup } from '@mui/material';
import { Button, MultipleSelect } from 'legos';
import { SearchInput } from 'legos/SearchInput';

type ProjectFiltersProps = {
  setStatus: (status: string) => void;
};

//TODO add PM info
const pm = [
  'Alex Rooox ',
  'Oleg Books ',
  'Stas sss ',
  'Oleg Bookssdfsdfsdf ',
  'Olesdfsg Bossdfsdfoks ',
  'Olsdfsdfeg Books ',
  'Olsdfsdfeg Books ',
  'Oleg Bosdfsdfoks ',
];
const filterItem = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Archived', value: 'archived' },
];
export const ProjectFilters = ({ setStatus }: ProjectFiltersProps) => {
  const [active, setActive] = useState(filterItem[0]);
  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  //Searchproject use for seach mutation
  const [searchProjects, setSearchProjects] = useState('');
  const handleClickButton = (index: number) => {
    setActive(filterItem[index]);

    filterItem[index].value === 'all'
      ? setStatus('all')
      : filterItem[index].value === 'active'
      ? setStatus('active')
      : setStatus('archived');
  };
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
        onChange={(value) => setSelectedItem(value)}
        label="Project manager"
        items={pm}
        value={selectedItem}
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

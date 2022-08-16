import React, { useState } from 'react';
import { ButtonGroup } from '@mui/material';
import { Button, MultipleSelect } from 'legos';
import { SearchInput } from 'legos/SearchInput';
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
  { label: 'All', value: 'All' },
  { label: 'Active', value: 'Active' },
  { label: 'Archived', value: 'Archived' },
];
export const ProjectFilters = () => {
  const [active, setActive] = useState(filterItem[0]);
  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  //Searchproject use for seach mutation
  const [searchProjects, setSearchProjects] = useState('');
  const handleClickButton = (e: number) => {
    setActive(filterItem[e]);
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
        {filterItem.map(({ label, value }, e) => (
          <Button
            sx={{ width: '90px' }}
            title={label}
            key={value}
            onClick={() => handleClickButton(e)}
            variant={active.value === value ? 'contained' : 'outlined'}
          />
        ))}
      </ButtonGroup>
    </>
  );
};

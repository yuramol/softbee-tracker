import React, { useState } from 'react';
import { ButtonGroup } from '@mui/material';
import { Button, MultipleSelect } from 'legos';
import { SearchInput } from 'legos/SearchInput';

type ProjectFiltersProps = {
  setStatus: (status: string[]) => void;
};

//TODO add PM info
const pm = [
  { label: 'Alex Rooox', value: '1' },
  { label: 'Oleg Books', value: '2' },
  { label: 'Stas sss', value: '3' },
  { label: 'Oleg Bookssdfsdfsdf', value: '4' },
  { label: 'Olesdfsg Bossdfsdfoks', value: '5' },
  { label: 'Olsdfsdfeg Books', value: '6' },
  { label: 'Olsdfsdfeg Books', value: '7' },
  { label: 'Oleg Bosdfsdfoks', value: '8' },
];
export const filterItem = [
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

    index === 0
      ? setStatus(filterItem.map(({ value }) => value))
      : setStatus([filterItem[index].value]);
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
        label="Project manager"
        variant="outlined"
        size="small"
        sx={{ width: 200 }}
        items={pm}
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

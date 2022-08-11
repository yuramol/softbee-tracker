import { ProjectList } from 'components/ProjectList/ProjectList';
import React, { useState } from 'react';
import { ButtonGroup, Stack, Typography } from '@mui/material';
import { MainWrapper, TimeInspector, TrackerCalendar } from '../../components';
import { MultipleSelect, Button } from 'legos';
import { SearchInput } from 'legos/SearchInput';
import { getInitials } from 'utils';

const ProjectPage = () => {
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

  //TODO add projects info and info about PR
  const projects = [
    {
      id: 1,
      projectName: 'UpWork',
      timeLine: '20.11.21-12.12.23',
      projectManager: 'Oleksandr Zastavnyi',
      type: 'fixedPrice',
    },
    {
      id: 3,
      projectName: 'Plumbid',
      timeLine: '20.11.21-12.12.23',
      projectManager: 'Yura Moldavchuk',
      type: 'fixedPrice',
    },
    {
      id: 4,
      projectName: 'PalPal',
      timeLine: '20.11.21-12.12.23',
      projectManager: 'Andrev Antonuch',
      type: 'timeMaterial',
      projectManagerAvatar: 'https://i.pravatar.cc/300',
    },
  ];

  const filterItem = [
    { label: 'All', value: 'All' },
    { label: 'Active', value: 'Active' },
    { label: 'Archived', value: 'Archived' },
  ];

  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [active, setActive] = useState(filterItem[0]);
  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  //Searchproject use for seach mutation
  const [searchProjects, setSearchProjects] = useState('');
  const handleClickButton = (e: number) => {
    setActive(filterItem[e]);
  };
  return (
    <MainWrapper
      sidebar={
        <>
          <Button
            sx={{ mb: 2 }}
            fullWidth
            variant="contained"
            title="Add new project"
            size="large"
          />
          <TimeInspector />
          <TrackerCalendar
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />
        </>
      }
    >
      <Typography variant="h1">Project</Typography>
      <Stack mt={4} spacing={2}>
        <Stack direction="row" spacing={2} mb={4}>
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
        </Stack>
        <ProjectList projectList={projects} />
      </Stack>
    </MainWrapper>
  );
};

export default ProjectPage;

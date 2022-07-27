import React, { useState } from 'react';
import { Header } from '../components';
import { MainWrapper } from '../components/MainWrapper/MainWrapper';
import { ProjectList } from '../components/ProjectList/ProjectList';
import { StyledIconButton } from '../legos';
import AddIcon from '@mui/icons-material/Add';
import { Typography } from '@mui/material';

export const ProjectPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Header />
      <MainWrapper
        content={<ProjectList />}
        sidebar={
          <StyledIconButton
            sx={{
              width: '200px',
              height: '40px',
              backgroundColor: '#2c387e',
              mt: 4,
            }}
            onClick={handleOpen}
          >
            <AddIcon />
            <Typography>Add new project</Typography>
          </StyledIconButton>
        }
      />
    </div>
  );
};

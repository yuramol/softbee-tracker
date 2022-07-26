import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

import { MainWrapper, ManualEntryForm } from '../components';
import { StyledIconButton } from '../legos';

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
    <MainWrapper sidebar={<p>Width right sidebar</p>}>
      <h1>Tracker</h1>
      <StyledIconButton
        sx={{ width: '40px', height: '40px' }}
        onClick={handleOpen}
      >
        <AddIcon />
      </StyledIconButton>
      <ManualEntryForm open={open} onClose={handleClose} />
    </MainWrapper>
  );
};

export default HomePage;

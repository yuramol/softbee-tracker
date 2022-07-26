import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

import { DayViewTracker, MainWrapper, ManualEntryForm } from '../components';
import { StyledIconButton } from '../legos';

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen(!open);

  return (
    <MainWrapper sidebar={<p>Width right sidebar</p>}>
      <h1>Tracker</h1>
      <StyledIconButton
        sx={{ width: '40px', height: '40px' }}
        onClick={handleToggle}
      >
        <AddIcon />
      </StyledIconButton>
      <ManualEntryForm open={open} onClose={handleToggle} />
      <DayViewTracker />
    </MainWrapper>
  );
};

export default HomePage;

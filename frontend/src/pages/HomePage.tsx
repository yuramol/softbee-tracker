import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

import { MainWrapper, ManualEntryForm, TrackerCalendar } from '../components';
import { StyledIconButton } from '../legos';

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen(!open);

  return (
    <MainWrapper sidebar={<TrackerCalendar />}>
      <h1>Tracker</h1>
      <StyledIconButton
        sx={{ width: '40px', height: '40px' }}
        onClick={handleToggle}
      >
        <AddIcon />
      </StyledIconButton>
      <ManualEntryForm open={open} onClose={handleToggle} />
    </MainWrapper>
  );
};

export default HomePage;

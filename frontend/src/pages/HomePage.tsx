import React, { useState } from 'react';
import { Header, ManualEntryForm } from '../components';
import AddIcon from '@mui/icons-material/Add';
import { StyledIconButton } from '../legos';
export const HomePage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Header />
      <p>Home page</p>
      <StyledIconButton
        sx={{ width: '40px', height: '40px', borderRadius: '10px' }}
        onClick={handleOpen}
      >
        <AddIcon />
      </StyledIconButton>
      <ManualEntryForm open={open} onClose={handleClose} />
    </div>
  );
};

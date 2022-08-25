import React from 'react';
import { IconButton, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type ButtonAddProps = {
  onClick: () => void;
};
export const ButtonAdd = ({ onClick }: ButtonAddProps) => (
  <>
    <Paper
      sx={{
        width: '3rem',
        height: '3rem',
      }}
    >
      <IconButton sx={{ borderRadius: 0 }} onClick={onClick}>
        <AddIcon fontSize="large" color="primary" />
      </IconButton>
    </Paper>
  </>
);

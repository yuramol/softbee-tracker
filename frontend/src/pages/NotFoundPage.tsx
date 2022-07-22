import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

import { MainWrapper } from '../components';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <MainWrapper>
      <Typography variant="h1">Page not found</Typography>
      <Button type="button" onClick={() => navigate(-1)}>
        Go back
      </Button>
    </MainWrapper>
  );
};

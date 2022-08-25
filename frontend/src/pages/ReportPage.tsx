import React from 'react';
import { Typography } from '@mui/material';

import { MainWrapper } from '../components';
import { PageProps } from './types';

const ReportPage: React.FC<PageProps> = ({ title }) => {
  return (
    <MainWrapper>
      <Typography variant="h1">{title}</Typography>
      <p>Full width container</p>
    </MainWrapper>
  );
};

export default ReportPage;

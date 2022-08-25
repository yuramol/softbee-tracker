import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';

import { MainWrapper } from 'components';
import { PageProps } from 'pages/types';

const ProfileEditPage: React.FC<PageProps> = ({ title }) => {
  const { userId } = useParams();

  return (
    <MainWrapper>
      <Typography variant="h1">
        {title}: User ID {userId}
      </Typography>
      <p>Full width container</p>
    </MainWrapper>
  );
};

export default ProfileEditPage;

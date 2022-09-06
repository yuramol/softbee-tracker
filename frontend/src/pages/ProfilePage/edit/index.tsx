import React from 'react';
import { useParams } from 'react-router-dom';

import { MainWrapper } from 'components';
import { PageProps } from 'pages/types';
import ProfileInformation from '../ProfileInformation';

const ProfileEditPage: React.FC<PageProps> = () => {
  const { userId } = useParams();

  return (
    <MainWrapper>
      <ProfileInformation id={`${userId}`} isCanEdit={true} />
    </MainWrapper>
  );
};

export default ProfileEditPage;

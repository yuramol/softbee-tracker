import React from 'react';
import { useParams } from 'react-router-dom';
import { MainWrapper } from 'components';
import { ProfileEditView } from '../ProfileEditView';

const ProfileViewPage = () => {
  const { userId } = useParams();

  return (
    <MainWrapper>
      <ProfileEditView id={`${userId}`} />
    </MainWrapper>
  );
};

export default ProfileViewPage;

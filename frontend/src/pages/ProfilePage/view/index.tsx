import React from 'react';
import { useParams } from 'react-router-dom';
import { MainWrapper } from 'components';
import { ProfileEditView } from '../ProfileEditView';
import { useAuthUser } from 'hooks';

const ProfileViewPage = () => {
  const { isManager } = useAuthUser();
  const { userId } = useParams();

  return (
    <MainWrapper>
      <ProfileEditView id={`${userId}`} enableEdit={isManager} />
    </MainWrapper>
  );
};

export default ProfileViewPage;

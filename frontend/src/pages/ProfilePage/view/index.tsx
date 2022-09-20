import React from 'react';
import { useParams } from 'react-router-dom';
import {
  MainWrapper,
  VacationApproveModalForm,
  VacationWidget,
} from 'components';
import { ProfileEditView } from '../ProfileEditView';
import { useAuthUser } from 'hooks';
import { Stack } from '@mui/system';

const ProfileViewPage = () => {
  const { isManager } = useAuthUser();
  const { userId } = useParams();

  return (
    <MainWrapper
      sidebar={
        <Stack gap={2}>
          <VacationApproveModalForm />
          <VacationWidget />
        </Stack>
      }
    >
      <ProfileEditView id={`${userId}`} enableEdit={isManager} />
    </MainWrapper>
  );
};

export default ProfileViewPage;

import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
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
  const { state } = useLocation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { edit } = state as any;

  return (
    <MainWrapper
      sidebar={
        <Stack gap={2}>
          <VacationApproveModalForm />
          <VacationWidget />
        </Stack>
      }
    >
      <ProfileEditView id={`${userId}`} enableEdit={edit && isManager} />
    </MainWrapper>
  );
};

export default ProfileViewPage;

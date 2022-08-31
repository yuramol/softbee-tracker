import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';

import { MainWrapper, Loader } from 'components';
import { PageProps } from 'pages/types';
import { useUsersPermissionsUser } from 'hooks';
import { Avatar } from 'legos';

const ProfileViewPage: React.FC<PageProps> = ({ title }) => {
  const { userId } = useParams();
  const { userPermission } = useUsersPermissionsUser(`${userId}`);

  return (
    <MainWrapper>
      {userPermission ? (
        <>
          <Avatar
            width={180}
            height={180}
            firstName={userPermission?.firstName}
            lastName={userPermission?.lastName}
            avatar={`https://dev.strapi.track.softbee.io${userPermission.avatar.data.attributes.url}`}
          />
          <Typography>
            {`${userPermission?.firstName} ${userPermission?.lastName}`}
          </Typography>
        </>
      ) : (
        <Loader />
      )}
    </MainWrapper>
  );
};

export default ProfileViewPage;

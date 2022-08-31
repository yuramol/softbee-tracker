import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import { useFormik } from 'formik';

import { MainWrapper, Loader } from 'components';
import { PageProps } from 'pages/types';
import { useAuthUser, useNotification, useUsersPermissionsUser } from 'hooks';
import { Avatar, Icon, Input, Select } from 'legos';
import { profileInfo, validationSchema } from '../helpers';
import { InitialValuesType, valuesType } from '../types';
import { UPDATE_USERS_PERMISSIONS_USER_MUTATION } from 'api';
import { useMutation } from '@apollo/client';
import { useChangeAvatar } from '../useChangeAvatar';
import ProfileInformation from '../ProfileInformation';

const ProfileViewPage: React.FC<PageProps> = ({ title }) => {
  const { userId } = useParams();

  return (
    <MainWrapper>
      {<ProfileInformation id={`${userId}`} edit={false} />}
    </MainWrapper>
  );
};

export default ProfileViewPage;

import * as React from 'react';

import { Avatar as MuiAvatar, Typography } from '@mui/material';
import { getInitials } from 'helpers';

type AvatarProps = {
  avatar?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  width?: number;
  height?: number;
};

export const Avatar = ({
  avatar,
  firstName,
  lastName,
  width,
  height,
}: AvatarProps) => (
  <MuiAvatar sx={{ width: { width }, height: { height } }} src={avatar}>
    <Typography fontSize={width ? width / 3 : 14}>
      {getInitials(firstName, lastName)}
    </Typography>
  </MuiAvatar>
);

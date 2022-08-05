import * as React from 'react';

import { Avatar, Typography } from '@mui/material';
import { getInitials } from 'utils';

type UniversalAvatarProps = {
  avatar?: string;
  name: string;
  width?: number;
  height?: number;
};

export const UniversalAvatar = ({
  avatar,
  name,
  width,
  height,
}: UniversalAvatarProps) => (
  <Avatar sx={{ width: { width }, height: { height } }} src={avatar}>
    <Typography fontSize={width ? width / 3 : 14}>
      {getInitials(name)}
    </Typography>
  </Avatar>
);

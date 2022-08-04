import * as React from 'react';

import { Avatar, Typography } from '@mui/material';
import { getInitials } from 'utils';

type UniversalAvatarProps = {
  avatar?: string;
  name: string;
  width?: string;
  height?: string;
};

export const UniversalAvatar = ({
  avatar,
  name,
  width,
  height,
}: UniversalAvatarProps) => (
  <Avatar sx={{ width: { width }, height: { height } }} src={avatar}>
    <Typography fontSize={12}>{getInitials(name)}</Typography>
  </Avatar>
);

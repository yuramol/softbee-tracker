import * as React from 'react';

import { Avatar as MuiAvatar, Typography } from '@mui/material';
import { getInitials } from 'helpers';

type AvatarProps = {
  avatar?: string;
  name: string;
  width?: number;
  height?: number;
};

export const Avatar = ({ avatar, name, width, height }: AvatarProps) => (
  <MuiAvatar sx={{ width: { width }, height: { height } }} src={avatar}>
    <Typography fontSize={width ? width / 3 : 14}>
      {getInitials(name)}
    </Typography>
  </MuiAvatar>
);

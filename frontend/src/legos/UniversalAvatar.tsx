import * as React from 'react';
import { Avatar } from '@mui/material';
import { getInitials } from 'utils';
type UniversalAvatarProps = {
  avatar?: string;
  name: string;
};
export const UniversalAvatar = ({ avatar, name }: UniversalAvatarProps) => (
  <Avatar src={avatar}>{getInitials(name)}</Avatar>
);

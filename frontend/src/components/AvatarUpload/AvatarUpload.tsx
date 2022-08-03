import React from 'react';

import { Typography, Box, IconButton } from '@mui/material';
import { UniversalAvatar } from 'legos';

type AvatarUploadProps = {
  avatar?: string;
  name: string;
};

export const AvatarUpload = ({ avatar, name }: AvatarUploadProps) => {
  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center">
        <UniversalAvatar
          width="150px"
          height="150px"
          name={name}
          avatar={avatar}
        />
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <Typography>Upload new photo</Typography>
          <input hidden accept="image/*" type="file" />
        </IconButton>
      </Box>
    </>
  );
};

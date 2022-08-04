import React from 'react';

import { Typography, Box, Button } from '@mui/material';
import { UniversalAvatar } from 'legos';

type AvatarUploadProps = {
  avatar: Blob | MediaSource;
  name: string;
  isLocalPath?: boolean;
  onChange: (data: any) => void;
};

export const AvatarUpload = ({
  avatar,
  name,
  onChange,
  isLocalPath,
}: AvatarUploadProps) => {
  const path = isLocalPath
    ? URL.createObjectURL(avatar)
    : `https://dev.strapi.track.softbee.io${avatar}`;

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <UniversalAvatar
          width="150px"
          height="150px"
          name={name}
          avatar={path}
        />
        <Button component="label" color="primary" aria-label="upload picture">
          <Typography fontSize={12}>Upload new photo</Typography>
          <input hidden accept="image/*" type="file" onChange={onChange} />
        </Button>
      </Box>
    </>
  );
};

import React, { ChangeEvent } from 'react';

import { Typography, Box, Button } from '@mui/material';
import { Avatar } from 'legos';

type AvatarUploadProps = {
  isCanEdit: boolean;
  avatar?: string;
  firstName: string;
  lastName: string;
  onChange: (data: ChangeEvent) => void;
};

export const AvatarUpload = ({
  isCanEdit,
  avatar,
  firstName,
  lastName,
  onChange,
}: AvatarUploadProps) => {
  const path = avatar ? `${process.env.REACT_APP_URI}${avatar}` : '';

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Avatar
        width={180}
        height={180}
        firstName={firstName}
        lastName={lastName}
        avatar={path}
      />
      {isCanEdit && (
        <Button component="label" color="primary" aria-label="upload picture">
          <Typography fontSize={12}>Upload new photo</Typography>
          <input hidden accept="image/*" type="file" onChange={onChange} />
        </Button>
      )}
    </Box>
  );
};

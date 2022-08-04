import React, { useState } from 'react';

import { Typography, Box, IconButton } from '@mui/material';
import { UniversalAvatar } from 'legos';

type AvatarUploadProps = {
  avatar?: string;
  name: string;
};

export const AvatarUpload = ({ avatar, name }: AvatarUploadProps) => {
  const [file, setFile] = useState('');
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const handleChange = (e) => {
    const data = e.target.files[0];
    setFile(data);
  };
  console.log(file, 'files');

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center">
        <UniversalAvatar
          width="150px"
          height="150px"
          name={name}
          avatar={`https://dev.strapi.track.softbee.io${avatar}`}
        />
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <Typography>Upload new photo</Typography>
          <input hidden accept="image/*" type="file" onChange={handleChange} />
        </IconButton>
      </Box>
    </>
  );
};

import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { Button } from 'legos';
import { ProfileHeaderProps } from './types';
import { formatUserFullName } from 'helpers';

export const ProfileHeader = ({
  firstName,
  lastName,
  setEdit,
  edit,
  resetForm,
  submitForm,
}: ProfileHeaderProps) => (
  <>
    <Box ml={3}>
      <Typography fontWeight={700} fontSize={32}>
        {formatUserFullName(firstName, lastName)}
      </Typography>
    </Box>
    {edit ? (
      <Stack direction="row" gap={1}>
        <Button
          title="cancel"
          variant="outlined"
          onClick={() => {
            setEdit(false);
            resetForm();
          }}
        />

        <Button title="Save" variant="contained" onClick={submitForm} />
      </Stack>
    ) : (
      <Button
        title="Edit"
        variant="outlined"
        onClick={() => setEdit(true)}
        icon="edit"
      />
    )}
  </>
);

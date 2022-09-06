import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { Button } from 'legos';
import { ProfileHeaderProps } from './types';
import { formatUserFullName } from 'helpers';
import { useLocation } from 'react-router-dom';

export const ProfileHeader = ({
  firstName,
  lastName,
  setEdit,
  edit,
  isCanEdit,
  resetForm,
  submitForm,
}: ProfileHeaderProps) => {
  const location = useLocation();
  console.log(location);
  return (
    <>
      <Box ml={3}>
        <Typography fontWeight={700} fontSize={32}>
          {formatUserFullName(firstName, lastName)}
        </Typography>
      </Box>
      {isCanEdit &&
        (edit ? (
          <Stack direction="row" gap={1}>
            <Button
              sx={{ width: '40px' }}
              title="cancel"
              variant="outlined"
              onClick={() => {
                setEdit(false);
                resetForm();
              }}
            />

            <Button
              sx={{ width: '40px' }}
              title="Save"
              variant="contained"
              onClick={submitForm}
            />
          </Stack>
        ) : (
          <Button
            title="Edit"
            variant="outlined"
            onClick={() => setEdit(true)}
            icon="edit"
          />
        ))}
    </>
  );
};

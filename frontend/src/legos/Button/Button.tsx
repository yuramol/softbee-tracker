import React from 'react';

import {
  Button as MuiButton,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material';

import { Icon } from 'legos';
import { ButtonProps } from './types';
import { LoadShadow } from './styled';

export const Button = ({
  icon,
  iconSize,
  loading,
  title,
  fontSize,
  ...props
}: ButtonProps) => {
  const { color } = props;
  return (
    <MuiButton {...props}>
      {title && (
        <Box mr={icon || loading || (loading && icon) ? 1 : 0}>
          <Typography fontSize={fontSize || 12}>{title}</Typography>
        </Box>
      )}
      {loading ? (
        <>
          <LoadShadow />
          <CircularProgress
            sx={{
              backgroundColor: 'transparent',
              position: 'absolute',
              top: 0,
              bottom: 0,
              margin: `auto 4px`,
              zIndex: 2,
            }}
            color="inherit"
            size={28}
          />
        </>
      ) : null}
      {icon ? <Icon icon={icon} size={iconSize} color={color} /> : null}
    </MuiButton>
  );
};

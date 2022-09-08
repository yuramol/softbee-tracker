import React from 'react';
import { TextFieldProps } from '@mui/material';
import { StyledInput } from './styled';

export const Input = ({ ...props }: TextFieldProps) => (
  <StyledInput fullWidth {...props} />
);

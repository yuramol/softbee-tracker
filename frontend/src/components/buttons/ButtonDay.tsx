import React from 'react';
import { Button, styled, SxProps } from '@mui/material';
import { FC } from 'react';

const StyledButton = styled(Button)({
  minWidth: '40px',
  minHeight: '30px',
});

type Props = {
  children?: React.ReactNode;
  sx?: SxProps;
  isActive?: boolean;
  onClick?: () => void;
};
export const ButtonDay: FC<Props> = ({ children, sx, isActive }) => {
  return (
    <StyledButton sx={sx} variant={isActive ? 'contained' : 'outlined'}>
      {children}
    </StyledButton>
  );
};

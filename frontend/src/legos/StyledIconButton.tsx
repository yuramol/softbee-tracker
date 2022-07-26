import { IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { theme } from '../theme';

export const StyledIconButton = styled(IconButton)({
  color: 'white',
  borderRadius: '10px',
  backgroundColor: theme.palette.common.successGreen,
  '&:hover': {
    backgroundColor: theme.palette.common.successGreen,
    opacity: 0.6,
  },
});

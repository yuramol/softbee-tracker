import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

export const StyledInput = styled(TextField)(() => ({
  '& label': {
    fontSize: '16px',
  },
}));

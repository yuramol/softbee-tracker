import { Select } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledSelect = styled(Select)(({ theme, readOnly, disabled }) => ({
  '& .MuiInput-input.Mui-disabled': {
    WebkitTextFillColor:
      readOnly && disabled ? theme.palette.common.black : 'inherit',
  },
}));

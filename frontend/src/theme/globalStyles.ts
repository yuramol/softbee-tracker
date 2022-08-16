import { GlobalStylesProps } from '@mui/system';
import { Theme } from '@mui/material';

export const globalStyles: GlobalStylesProps<Theme>['styles'] = {
  html: {
    height: '100%',
  },
  body: {
    height: '100%',
  },
  '#root': {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
};

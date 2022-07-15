import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    textDark?: string;
    section?: string;
  }
}
export const theme = createTheme({
  palette: {
    primary: {
      main: '#104065',
    },
    secondary: {
      main: '#f5d040 ',
    },
    section: '#f0f6f4 ',
    textDark: '#3b4649',
  },
  typography: {
    fontFamily: ['Poppins', 'Roboto', 'Helvetica Neue', 'sans-serif'].join(','),
  },
});

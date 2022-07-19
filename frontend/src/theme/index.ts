import { createTheme } from '@mui/material';
import Poppins300 from '../assets/fonts/poppins-v20-latin-300.woff2';
import Poppins500 from '../assets/fonts/poppins-v20-latin-500.woff2';
import Poppins600 from '../assets/fonts/poppins-v20-latin-600.woff2';
import Poppins700 from '../assets/fonts/poppins-v20-latin-700.woff2';
import Poppins800 from '../assets/fonts/poppins-v20-latin-800.woff2';
import Poppins900 from '../assets/fonts/poppins-v20-latin-900.woff2';
import PoppinsRegular from '../assets/fonts/poppins-v20-latin-regular.woff2';
declare module '@mui/material/styles' {
  interface PaletteOptions {
    custom: { brandLightBlue?: string };
  }
}
export const theme = createTheme({
  palette: {
    primary: {
      main: '#104065',
      light: '#f0f6f4',
    },

    secondary: {
      main: '#f5d040 ',
      dark: '#3b4649',
    },
    custom: {
      brandLightBlue: '#f0f6f4 ',
    },
  },
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 300;
          font-display:swap;
          url(${Poppins300}) format('woff2');
        }
        @font-face {
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 500;
          font-display:swap;
          url(${Poppins500}) format('woff2');
        }
        @font-face {
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 600;
          font-display:swap;
          url(${Poppins600}) format('woff2');
        }
        @font-face {
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 700;
          font-display:swap;
          url(${Poppins700}) format('woff2');
        }
        @font-face {
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 800;
          font-display:swap;
          url(${Poppins800}) format('woff2');
        }
        @font-face {
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 900;
          font-display:swap;
          url(${Poppins900}) format('woff2');
        }
        @font-face {
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 400;
          font-display:swap;
          url(${PoppinsRegular}) format('woff2');
        }
      `,
    },
  },
});

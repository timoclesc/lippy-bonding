'use client';

import { createTheme } from '@mui/material/styles';
import { lightGreen, purple } from '@mui/material/colors';

const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  palette: {
    primary: purple,
    secondary: lightGreen,
  }

});

export default theme;
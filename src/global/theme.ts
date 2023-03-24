import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: "'Lora', sans-serif",
    body1: {
      fontFamily: 'Helvetica, sans-serif',
    },
  },
  palette: {
    primary: {
      main: '#003546',
      light: '#add8e6',
      dark: '#00373e',
    },
    secondary: {
      main: '#e9e9e9',
      light: '#a0a0a0',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50',
    },
    background: {
      default: '#f0f8ff',
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
        },
      },
    },
  },
});

import type { AppProps } from 'next/app';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../global/providers/use-auth-provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import '@/styles/globals.css';
import { CssBaseline } from '@mui/material';

const queryClient = new QueryClient();

const font = "'Lora', sans-serif";
const theme = createTheme({
  typography: {
    fontFamily: font,
  },
  palette: {
    primary: {
      main: '#003546',
    },
    secondary: {
      main: '#fcbf49',
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
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SessionProvider session={pageProps.session}>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            <ReactQueryDevtools />
          </QueryClientProvider>
        </AuthProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}

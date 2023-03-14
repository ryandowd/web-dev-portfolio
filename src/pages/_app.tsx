import type { AppProps } from 'next/app';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../global/context/use-auth-provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { theme } from '@/global/theme';

import '@/styles/globals.css';
import { CssBaseline } from '@mui/material';

const queryClient = new QueryClient();

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

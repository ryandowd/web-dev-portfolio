import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ErrorBoundary from '@/sites/main/components/ui/ErrorBoundary';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { theme } from '@/styles/theme';

import '@/styles/globals.css';
import { CssBaseline } from '@mui/material';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SessionProvider session={pageProps.session}>
          <QueryClientProvider client={queryClient}>
            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </SessionProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

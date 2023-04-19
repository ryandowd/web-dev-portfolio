import { useState } from 'react';
import {
  Container,
  Link,
  Box,
  Divider,
  Button,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { SignInFormCredentials } from '@/sites/main/components/login/SignInFormCredentials';
import { SignInFormGoogle } from '@/sites/main/components/login/SignInFormGoogle';
import { GlobalNav } from '@/sites/main/components/ui/GlobalNav';

export default function SignInPage() {
  const [showCredentialsForm, setShowCredentialsForm] =
    useState<boolean>(false);
  return (
    <>
      <GlobalNav>
        <Link
          href={'/portfolio'}
          sx={{ display: 'flex', color: '#fff', textDecoration: 'none' }}
        >
          <Button
            startIcon={<ArrowBackIcon sx={{ mr: 1 }} />}
            variant='contained'
          >
            Back to home
          </Button>
        </Link>
      </GlobalNav>
      <Container component='main' maxWidth='xs'>
        <Box sx={{ mt: 6, mb: 6 }}>
          <SignInFormGoogle />
        </Box>
        <Typography sx={{ textAlign: 'center' }}>OR</Typography>
        {!showCredentialsForm && (
          <Button
            sx={{ textAlign: 'center', mt: 6, width: '100%' }}
            onClick={() => setShowCredentialsForm(true)}
            variant='outlined'
          >
            Sign in with credentials
          </Button>
        )}
        {showCredentialsForm && <SignInFormCredentials />}
      </Container>
    </>
  );
}

import { Container, Link, Box, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { SignInFormCredentials } from '@/sites/main/components/login/SignInFormCredentials';
import { SignInFormGoogle } from '@/sites/main/components/login/SignInFormGoogle';
import { GlobalNav } from '@/sites/main/components/ui/GlobalNav';

export default function SignInPage() {
  return (
    <>
      <GlobalNav>
        <Link
          href={'/portfolio'}
          sx={{ display: 'flex', color: '#fff', textDecoration: 'none' }}
        >
          <ArrowBackIcon sx={{ mr: 1 }} />
          Back to home
        </Link>
      </GlobalNav>
      <Container component='main' maxWidth='xs'>
        <SignInFormCredentials />
        <Divider sx={{ mt: 4, mb: 2 }} />
        <Box sx={{ textAlign: 'center' }}>OR</Box>
        <SignInFormGoogle />
        <Box sx={{ mb: 10 }} />
      </Container>
    </>
  );
}

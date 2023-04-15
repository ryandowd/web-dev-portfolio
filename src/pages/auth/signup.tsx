import { Button, Container, Link } from '@mui/material';
import { SignUpFormCredentials } from '@/sites/main/components/login/SignUpFormCredentials';

export default function SignUpPage() {
  return (
    <Container component='main' maxWidth='xs'>
      <Link href={'/portfolio'}>
        <Button variant='contained'>Back to home</Button>
      </Link>
      <SignUpFormCredentials />
    </Container>
  );
}

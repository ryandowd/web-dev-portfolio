import { Container, Link } from '@mui/material';
import { SignUpFormCredentials } from '@/components/login/SignUpFormCredentials';

export default function SignUpPage() {
  return (
    <Container component='main' maxWidth='xs'>
      <Link href={'/portfolio'}>Back to home</Link>
      <SignUpFormCredentials />
    </Container>
  );
}

// import { SignUpForm } from '@/components/Login/SignUpForm';
// import Link from 'next/link';

// export default function SignupUserForm() {
//   return (
//     <>
//       <Link href='/'>Back to home</Link>
//       <SignUpForm />
//     </>
//   );
// }

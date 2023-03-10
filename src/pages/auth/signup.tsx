import { SignUpForm } from '@/components/Login/SignUpForm';
import Link from 'next/link';

export default function SignupUserForm() {
  return (
    <>
      <Link href='/'>Back to home</Link>
      <SignUpForm />
    </>
  );
}

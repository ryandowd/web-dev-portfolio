import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { getProviders, signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import { SignInForm } from '@/components/login/SignInForm';
import Link from 'next/link';

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log('providers', providers);
  return (
    <>
      <Link href={'/'}>Home</Link>
      <Link href={'/auth/signup'}>Sign up</Link>
      {Object.values(providers).map((provider) => {
        if (provider.id === 'credentials') {
          return <SignInForm nextAuthSignIn={signIn} key={provider.name} />;
        } else {
          return (
            <div key={provider.name}>
              <button onClick={() => signIn(provider.id)}>
                Sign in with {provider.name}
              </button>
            </div>
          );
        }
      })}
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // const session = await getServerSession(context.req, context.res, authOptions);

  // // If the user is already logged in, redirect.
  // // Note: Make sure not to redirect to the same page
  // // To avoid an infinite loop!
  // if (session) {
  //   return { redirect: { destination: '/' } };
  // }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}

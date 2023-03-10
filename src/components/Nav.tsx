import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

import classes from './Nav.module.scss';

export const Nav = () => {
  const { data: session } = useSession();

  const logoutHandler = () => {
    signOut();
  };

  return (
    <nav className={classes.nav}>
      {!session ? (
        <>
          <Link href='/auth/signin'>Sign in</Link>
          <Link href='/auth/signup'>Sign up</Link>
        </>
      ) : (
        <button type='button' onClick={logoutHandler}>
          Log out
        </button>
      )}
    </nav>
  );
};

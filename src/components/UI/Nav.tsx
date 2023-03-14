import { useSession, signOut } from 'next-auth/react';
import { LinkStyled } from '@/components/ui/LinkStyled';
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
        <div className='flex justify-content'>
          <Link href='/auth/signin'>Sign In</Link>
          <Link href='/auth/signup'>Sign up</Link>
        </div>
      ) : (
        <button type='button' onClick={logoutHandler}>
          Log out
        </button>
      )}
    </nav>
  );
};

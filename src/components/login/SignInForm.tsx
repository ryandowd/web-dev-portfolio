import { useRef, useState } from 'react';

import classes from './Form.module.scss';

interface SignInFormProps {
  nextAuthSignIn: (
    providerName: string,
    credentialsObj: { username: string; password: string }
  ) => void;
}

export const SignInForm = (props: SignInFormProps) => {
  const { nextAuthSignIn } = props;
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  function clearErrorMessage() {
    setErrorMessage(null);
  }

  async function signInFormHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    // Create User
    if (username && password) {
      nextAuthSignIn('credentials', {
        username,
        password,
      });
    }
  }

  return (
    <>
      <h1>Sign in with credentials</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={(event) => signInFormHandler(event)}>
        <div className={classes.control}>
          <label htmlFor='username'>Username</label>
          <input
            ref={usernameRef}
            id='username'
            type='text'
            onChange={clearErrorMessage}
          ></input>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Password</label>
          <input ref={passwordRef} id='password' type='password'></input>
        </div>
        <button type='submit' className={classes.button}>
          Sign In
        </button>
      </form>
    </>
  );
};

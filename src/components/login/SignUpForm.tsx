import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';

import classes from './Form.module.scss';
import Link from 'next/link';

// interface SignupUserFormProps {
//   closeModalHandler: () => void;
// }

interface MutationParams {
  username: string;
  password: string;
}

export const SignUpForm = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>();
  //   const { closeModalHandler } = props;
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const { mutate } = useMutation({
    mutationFn: async ({ username, password }: MutationParams) => {
      const response = await axios.post('/api/auth/user-signup', {
        username,
        password,
      });
      return response.data;
    },
    onSuccess: () => {
      router.push({
        pathname: '/api/auth/signin',
        query: { callbackUrl: 'http://localhost:3000' },
      });
    },
    onError: (data: AxiosError) => {
      if (data) {
        const error = data.response as AxiosResponse;
        setErrorMessage(error.data.message);
      }
    },
  });

  async function createUser(username: string, password: string) {
    mutate({ username, password });
  }

  function clearErrorMessage() {
    setErrorMessage(null);
  }

  async function createUserFormHandler(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    // Create User
    if (username && password) {
      createUser(username, password);
    }
  }

  return (
    <div className={classes.form}>
      <h1>Sign up</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={(event) => createUserFormHandler(event)}>
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
          Sign up
        </button>
        <Link href='/auth/signin'>Or sign in with existing account</Link>
      </form>
    </div>
  );
};

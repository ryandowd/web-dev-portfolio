import { useRef, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';

import LoadingButton from '@mui/lab/LoadingButton';
import {
  LockOutlined as LockOutlinedIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';

import {
  Avatar,
  Alert,
  TextField,
  Link,
  Box,
  Typography,
  InputAdornment,
} from '@mui/material';

interface MutationParams {
  username: string;
  password: string;
}

export const SignUpFormCredentials = () => {
  const router = useRouter();
  const [signInLoading, setSignInLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [passwordInputType, setPasswordInputType] = useState<
    'password' | 'text'
  >('password');

  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const { mutate } = useMutation({
    mutationFn: async ({ username, password }: MutationParams) => {
      setErrorMessage(null);
      const response = await axios.post('/api/auth/user-signup', {
        username,
        password,
      });
      return response.data;
    },
    onSuccess: (data) => {
      const { username, password } = data;
      signIn('credentials', {
        callbackUrl: `${window.location.origin}`,
        username,
        password,
      });
    },
    onError: (data: AxiosError) => {
      setSignInLoading(false);
      setErrorMessage(null);
      if (data) {
        const error = data.response as AxiosResponse;
        setErrorMessage(error.data.message);
      }
    },
  });

  async function createUser(username: string, password: string) {
    mutate({ username, password });
  }

  async function createUserFormHandler(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setSignInLoading(true);

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    // Create User
    if (username && password) {
      createUser(username, password);
    }
  }

  function togglePasswordVisibilityHandler() {
    if (passwordInputType === 'password') {
      setPasswordInputType('text');
    } else {
      setPasswordInputType('password');
    }
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Sign up for an account
      </Typography>
      {errorMessage && (
        <Alert severity='error' sx={{ width: 1, mt: 3, mb: 1 }}>
          {errorMessage}
        </Alert>
      )}
      <Box
        component='form'
        onSubmit={createUserFormHandler}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin='normal'
          required
          fullWidth
          id='username'
          label='Username'
          name='username'
          autoComplete='username'
          autoFocus
          inputRef={usernameRef}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          name='password'
          label='Password'
          type={passwordInputType}
          id='password'
          autoComplete='current-password'
          inputRef={passwordRef}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <VisibilityIcon
                  onClick={togglePasswordVisibilityHandler}
                  sx={{ '&:hover': { cursor: 'pointer' } }}
                />
              </InputAdornment>
            ),
          }}
        />
        <LoadingButton
          type='submit'
          fullWidth
          loading={signInLoading}
          loadingPosition='end'
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </LoadingButton>
        <Link
          href='/auth/signin'
          variant='body2'
          textAlign='center'
          sx={{ width: 1, display: 'block' }}
        >
          {'Already have an account? Sign in'}
        </Link>
      </Box>
    </Box>
  );
};

// export const SignUpForm = () => {
//   const router = useRouter();
//   const [errorMessage, setErrorMessage] = useState<string | null>();
//   //   const { closeModalHandler } = props;
//   const usernameRef = useRef<HTMLInputElement | null>(null);
//   const passwordRef = useRef<HTMLInputElement | null>(null);

//   const { mutate } = useMutation({
//     mutationFn: async ({ username, password }: MutationParams) => {
//       const response = await axios.post('/api/auth/user-signup', {
//         username,
//         password,
//       });
//       return response.data;
//     },
//     onSuccess: () => {
//       router.push({
//         pathname: '/api/auth/signin',
//         query: { callbackUrl: 'http://localhost:3000' },
//       });
//     },
//     onError: (data: AxiosError) => {
//       if (data) {
//         const error = data.response as AxiosResponse;
//         setErrorMessage(error.data.message);
//       }
//     },
//   });

//   async function createUser(username: string, password: string) {
//     mutate({ username, password });
//   }

//   function clearErrorMessage() {
//     setErrorMessage(null);
//   }

//   async function createUserFormHandler(
//     event: React.FormEvent<HTMLFormElement>
//   ) {
//     event.preventDefault();

//     const username = usernameRef.current?.value;
//     const password = passwordRef.current?.value;

//     // Create User
//     if (username && password) {
//       createUser(username, password);
//     }
//   }

//   return (
//     <div className={classes.form}>
//       <h1>Sign up</h1>
//       {errorMessage && <p>{errorMessage}</p>}
//       <form onSubmit={(event) => createUserFormHandler(event)}>
//         <div className={classes.control}>
//           <label htmlFor='username'>Username</label>
//           <input
//             ref={usernameRef}
//             id='username'
//             type='text'
//             onChange={clearErrorMessage}
//           ></input>
//         </div>
//         <div className={classes.control}>
//           <label htmlFor='password'>Password</label>
//           <input ref={passwordRef} id='password' type='password'></input>
//         </div>
//         <button type='submit' className={classes.button}>
//           Sign up
//         </button>
//         <Link href='/auth/signin'>Or sign in with existing account</Link>
//       </form>
//     </div>
//   );
// };

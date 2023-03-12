import { useRef, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';

import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';

export const SignInFormCredentials = () => {
  const { status } = useSession();
  const [signInLoading, setSignInLoading] = useState(false);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  console.log('signInLoading', signInLoading);

  async function signInFormHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    // Create User
    if (username && password) {
      setSignInLoading(true);
      signIn('credentials', {
        callbackUrl: `${window.location.origin}`,
        username,
        password,
      });
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
        Sign in
      </Typography>
      <Box
        component='form'
        onSubmit={signInFormHandler}
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
          type='password'
          id='password'
          autoComplete='current-password'
          inputRef={passwordRef}
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
          href='/auth/signup'
          variant='body2'
          textAlign='center'
          sx={{ width: 1, display: 'block' }}
        >
          {"Don't have an account? Sign Up"}
        </Link>
      </Box>
    </Box>
  );
};

// import { useRef, useState } from 'react';
// import { Button } from '../UI/Button';

// import classes from './Form.module.scss';

// interface SignInFormProps {
//   nextAuthSignIn: (
//     providerName: string,
//     credentialsObj: { callbackUrl: string; username: string; password: string }
//   ) => void;
// }

// export const SignInForm = (props: SignInFormProps) => {
//   const { nextAuthSignIn } = props;
//   const [errorMessage, setErrorMessage] = useState<string | null>();
//   const usernameRef = useRef<HTMLInputElement | null>(null);
//   const passwordRef = useRef<HTMLInputElement | null>(null);

//   function clearErrorMessage() {
//     setErrorMessage(null);
//   }

//   async function signInFormHandler(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();

//     const username = usernameRef.current?.value;
//     const password = passwordRef.current?.value;

//     // Create User
//     if (username && password) {
//       nextAuthSignIn('credentials', {
//         callbackUrl: `${window.location.origin}`,
//         username,
//         password,
//       });
//     }
//   }

//   return (
//     <>
//       <h1>Sign in with credentials</h1>
//       {errorMessage && <p>{errorMessage}</p>}
//       <form onSubmit={(event) => signInFormHandler(event)}>
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
//         <button type='submit'>Sign in</button>
//       </form>
//     </>
//   );
// };

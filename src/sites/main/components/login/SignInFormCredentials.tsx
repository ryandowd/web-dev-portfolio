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
  const [signInLoading, setSignInLoading] = useState(false);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

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
        marginTop: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component='h1' variant='h5'>
        Sign in with credentials
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

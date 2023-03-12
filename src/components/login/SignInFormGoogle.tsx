import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { LoadingButton } from '@mui/lab';
import { Google } from '@mui/icons-material';

export const SignInFormGoogle = () => {
  const [signInLoading, setSignInLoading] = useState(false);

  function signInFormHandler() {
    setSignInLoading(true);
    signIn('google', {
      callbackUrl: `${window.location.origin}`,
    });
  }

  return (
    <LoadingButton
      fullWidth
      startIcon={<Google />}
      loading={signInLoading}
      loadingPosition='end'
      variant='contained'
      sx={{ mt: 3, mb: 2 }}
      onClick={signInFormHandler}
    >
      Sign in with Google
    </LoadingButton>
  );
};

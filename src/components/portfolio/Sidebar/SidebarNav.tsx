import { Typography } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import { Link } from '@mui/material';

export const SidebarNav = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
        flexDirection: {
          xs: 'column',
          lg: 'row',
        },
      }}
    >
      <Typography
        variant='h3'
        fontWeight={700}
        sx={{
          marginBottom: {
            xs: '20px',
            lg: 0,
          },
        }}
      >
        Ryan Dowd
      </Typography>
      <Box
        sx={{
          display: 'flex',
          a: {
            border: `1px solid ${theme.palette.primary.dark}`,
            padding: '6px 25px',
            textAlign: 'center',

            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
              transition: 'all 0.3s',
              color: '#FFF',
            },
          },
        }}
      >
        <Link
          target='_blank'
          href='https://github.com/ryandowd'
          sx={{ marginRight: '10px' }}
        >
          Github
        </Link>
        <Link
          target='_blank'
          href='https://www.linkedin.com/in/ryandowddeveloper/'
        >
          LinkedIn
        </Link>
      </Box>
    </Box>
  );
};

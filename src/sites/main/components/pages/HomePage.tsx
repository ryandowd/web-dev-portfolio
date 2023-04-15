import { useSession, signOut } from 'next-auth/react';
import {
  Link,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Button,
} from '@mui/material';
import NextLink from 'next/link';
import { GlobalNav } from '@/sites/main/components/ui/GlobalNav';
import { Container } from '@mui/system';

export const HomePage = () => {
  const { data: session } = useSession();

  const isAllowedUser =
    // @ts-ignore
    session?.user?.role === 'user' || session?.user?.role === 'admin';

  console.log('session', session);
  console.log('isAllowedUser', isAllowedUser);

  const portfolioItem = (
    <Card>
      <NextLink href='/portfolio'>
        <CardActionArea>
          <CardMedia
            sx={{
              height: 280,
              backgroundPosition: '0 0',
            }}
            image='assets/images/banner-portfolio.png'
            title='portfolio banner'
          />
          <CardContent>
            <Typography
              gutterBottom
              variant='h5'
              component='div'
              textAlign='center'
            >
              Portfolio
            </Typography>
          </CardContent>
        </CardActionArea>
      </NextLink>
    </Card>
  );

  const financeItem = isAllowedUser && (
    <Card>
      <NextLink href='/finance-tracker'>
        <CardActionArea>
          <CardMedia
            sx={{ height: 280, backgroundPosition: '0 0' }}
            image='assets/images/banner-finance.png'
            title='finance banner'
          />
          <CardContent>
            <Typography
              gutterBottom
              variant='h5'
              component='div'
              textAlign='center'
            >
              Finance Tracker
            </Typography>
          </CardContent>
        </CardActionArea>
      </NextLink>
    </Card>
  );

  return (
    <>
      <GlobalNav>
        {!session ? (
          <Button variant='contained'>
            <Link
              href='/auth/signin'
              sx={{ color: '#fff', textDecoration: 'none', cursor: 'pointer' }}
            >
              Sign In
            </Link>
          </Button>
        ) : (
          <Button variant='contained'>
            <Link
              onClick={() => signOut()}
              sx={{ color: '#fff', textDecoration: 'none', cursor: 'pointer' }}
            >
              Sign Out
            </Link>
          </Button>
        )}
      </GlobalNav>

      <Container component='main' sx={{ marginTop: 10 }}>
        <Grid container spacing={5} columnSpacing={10}>
          <Grid item xs={12} md={6}>
            {portfolioItem}
          </Grid>
          <Grid item xs={12} md={6}>
            {financeItem}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

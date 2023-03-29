import { useSession, signOut } from 'next-auth/react';
import {
  Link,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Grid,
} from '@mui/material';
import NextLink from 'next/link';
import { GlobalNav } from '@/sites/main/components/ui/GlobalNav';
import { Container } from '@mui/system';

export const HomePage = () => {
  const { data: session } = useSession();

  const portfolioItem = (
    <Card>
      <NextLink href='/portfolio'>
        <CardActionArea>
          <CardMedia
            sx={{ height: 140 }}
            image='assets/images/banner-portfolio.png'
            title='green iguana'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              Portfolio
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              My web developer portfolio. Showing a timeline of my career as a
              web developer and a list of my current skillsets.
            </Typography>
          </CardContent>
        </CardActionArea>
      </NextLink>
    </Card>
  );

  const financeItem = session && (
    <Card>
      <NextLink href='/finance-tracker'>
        <CardActionArea>
          <CardMedia
            sx={{ height: 140 }}
            image='assets/images/banner-portfolio.png'
            title='green iguana'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              Finance Tracker
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
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
          <Link
            href='/auth/signin'
            sx={{ color: '#fff', textDecoration: 'none', cursor: 'pointer' }}
          >
            Sign In
          </Link>
        ) : (
          <Link
            onClick={() => signOut()}
            sx={{ color: '#fff', textDecoration: 'none', cursor: 'pointer' }}
          >
            Sign Out
          </Link>
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

import { useSession, signOut } from 'next-auth/react';
import {
  Link,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import NextLink from 'next/link';
import { GlobalNav } from '@/components/ui/GlobalNav';
import { Container } from '@mui/system';

export const HomePage = () => {
  const { data: session } = useSession();

  const portfolioItem = (
    <Card sx={{ maxWidth: 345 }}>
      <NextLink href='/portfolio'>
        <CardActionArea>
          <CardMedia
            sx={{ height: 140 }}
            image='/static/images/cards/contemplative-reptile.jpg'
            title='green iguana'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              Portfolio
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

  const financeItem = session && (
    <Card sx={{ maxWidth: 345 }}>
      <NextLink href='/finance-tracker'>
        <CardActionArea>
          <CardMedia
            sx={{ height: 140 }}
            image='/static/images/cards/contemplative-reptile.jpg'
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
            sx={{ color: '#fff', textDecoration: 'none' }}
          >
            Sign In
          </Link>
        ) : (
          <Link
            onClick={() => signOut()}
            sx={{ color: '#fff', textDecoration: 'none' }}
          >
            Sign Out
          </Link>
        )}
      </GlobalNav>

      <Container
        component='main'
        sx={{ display: 'flex', justifyContent: 'space-evenly', mt: 10 }}
      >
        {portfolioItem}
        {financeItem}
      </Container>
    </>
  );
};

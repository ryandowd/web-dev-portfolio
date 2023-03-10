import { Container } from '@mui/material';

interface NewNavProps {
  children: React.ReactNode;
}

export const GlobalNav = (props: NewNavProps) => {
  const { children } = props;
  return (
    <Container
      component='nav'
      maxWidth={false}
      sx={{ p: 3, backgroundColor: '#000' }}
    >
      <Container
        component='main'
        maxWidth='xs'
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        {children}
      </Container>
    </Container>
  );
};

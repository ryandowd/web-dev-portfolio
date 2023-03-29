import { Container } from '@mui/material';

interface GlobalNavProps {
  children: React.ReactNode;
}

export const GlobalNav = (props: GlobalNavProps) => {
  const { children } = props;
  return (
    <Container
      component='nav'
      maxWidth={false}
      sx={{ p: 3, backgroundColor: '#000' }}
    >
      <Container
        maxWidth='xs'
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        {children}
      </Container>
    </Container>
  );
};

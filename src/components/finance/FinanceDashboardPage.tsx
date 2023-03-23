import { Typography } from '@mui/material';
import { Container } from '@mui/system';

export const FinanceDashboardPage = (props) => {
  const { snapshots } = props;

  console.log('snapshots', snapshots);
  return (
    <Container component='main'>
      <Typography variant='h1'>Finance Dashboard</Typography>
    </Container>
  );
};

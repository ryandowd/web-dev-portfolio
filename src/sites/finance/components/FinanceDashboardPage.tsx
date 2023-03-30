import { Box, Button, Typography, useTheme } from '@mui/material';
import { Container } from '@mui/system';
import { FinanceDashboardAreaChart } from './FinanceDashboardAreaChart';
import { Snapshot } from '@/sites/finance/global/types';
import { SnapshotTotalsList } from './SnapshotTotalsList';

type FinanceDashboardPageProps = {
  snapshots: Snapshot[];
};

export const FinanceDashboardPage = (props: FinanceDashboardPageProps) => {
  const theme = useTheme();
  const { snapshots } = props;

  console.log('snapshots', snapshots);

  return (
    <Container
      component='main'
      sx={{
        backgroundColor: theme.palette.background.default,
        marginBottom: '100px',
      }}
    >
      <Typography variant='h3' sx={{ margin: '20px 0', textAlign: 'center' }}>
        Finance Dashboard
      </Typography>
      <FinanceDashboardAreaChart snapshots={snapshots} />
      <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <Button
          variant='contained'
          color='primary'
          href='/finance-tracker/snapshots/new-snapshot'
        >
          Add new snapshot
        </Button>
      </Box>
      <SnapshotTotalsList snapshots={snapshots} />
    </Container>
  );
};

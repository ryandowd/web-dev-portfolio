import { Box, Button, Typography, useTheme } from '@mui/material';
import { Container } from '@mui/system';
import { FinanceDashboardAreaChart } from './FinanceDashboardAreaChart';
import { SnapshotWithTotals } from '../../sites/finance/global/types';
import { SnapshotTotalsList } from './SnapshotTotalsList';

type FinanceDashboardPageProps = {
  snapshotsWithTotals: SnapshotWithTotals[];
};

export const FinanceDashboardPage = (props: FinanceDashboardPageProps) => {
  const theme = useTheme();
  const { snapshotsWithTotals } = props;

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
      <FinanceDashboardAreaChart snapshotsWithTotals={snapshotsWithTotals} />
      <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <Button
          variant='contained'
          color='primary'
          href='/finance-tracker/snapshots/new-snapshot'
        >
          Add new snapshot
        </Button>
      </Box>
      <SnapshotTotalsList snapshotsWithTotals={snapshotsWithTotals} />
    </Container>
  );
};

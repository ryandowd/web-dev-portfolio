import { Box, Button, Typography, useTheme } from '@mui/material';
import { Container } from '@mui/system';
import { FinanceDashboardAreaChart } from './FinanceDashboardAreaChart';
import { Snapshot } from '@/sites/finance/global/types';
import { SnapshotTotalsList } from './SnapshotTotalsList';
import CircularProgress from '@mui/material/CircularProgress';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

export const FinanceDashboardPage = () => {
  const theme = useTheme();

  const [fetchedSnapshots, getFetchedSnapshots] = useState<Snapshot[]>([]);

  useQuery({
    queryKey: ['snapshots'],
    queryFn: async () => {
      const response = await axios.get('/api/finance/snapshots');
      return response.data;
    },
    onSuccess: (data) => {
      getFetchedSnapshots(data.snapshots);
    },
    refetchOnWindowFocus: false,
  });

  if (!fetchedSnapshots.length) {
    return (
      <Box
        sx={{
          position: 'absolute',
          left: 'calc(50% - 20px)',
          top: 'calc(50% - 20px)',
          width: '40px',
          height: '40px',
          transform: 'scale(3)',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

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
      <FinanceDashboardAreaChart snapshots={fetchedSnapshots} />
      <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <Button
          variant='contained'
          color='primary'
          href='/finance-tracker/snapshots/new-snapshot'
        >
          Add new snapshot
        </Button>
      </Box>
      <SnapshotTotalsList snapshots={fetchedSnapshots} />
    </Container>
  );
};

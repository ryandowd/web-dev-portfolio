import { Box, Button, Typography, useTheme } from '@mui/material';
import { Container } from '@mui/system';
import { FinanceDashboardAreaChart } from './FinanceDashboardAreaChart';
import { Snapshot } from '@/sites/finance/global/types';
import { SnapshotTotalsList } from './SnapshotTotalsList';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

type FinanceDashboardPageProps = {
  snapshots: Snapshot[];
};

export const FinanceDashboardPage = (props: FinanceDashboardPageProps) => {
  const { snapshots } = props;
  const theme = useTheme();

  console.log('FIANNCE PAGE', snapshots);
  const [fetchedSnapshots, getFetchedSnapshots] =
    useState<Snapshot[]>(snapshots);

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

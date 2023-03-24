import { Box, Button, Typography, useTheme } from '@mui/material';
import { Container } from '@mui/system';
import { SnapshotTotalsList } from './SnapshotTotalsList';

export const FinanceDashboardPage = (props) => {
  const theme = useTheme();
  const { snapshotsTotals } = props;

  return (
    <Container
      component='main'
      sx={{ backgroundColor: theme.palette.background.default }}
    >
      <Typography variant='h3' sx={{ margin: '20px 0', textAlign: 'center' }}>
        Finance Dashboard
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <Button
          variant='contained'
          color='primary'
          href='/finance-tracker/snapshots/new-snapshot'
        >
          Add new snapshot
        </Button>
      </Box>
      <SnapshotTotalsList snapshotsTotals={snapshotsTotals} />
    </Container>
  );
};

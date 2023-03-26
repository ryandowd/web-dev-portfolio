import { LoadingButton } from '@mui/lab';
import { Box, Button, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { GlobalNav } from '../ui/GlobalNav';
import { SnapshotDetailOverview } from './SnapshotDetailOverview';
import { Snapshot, SnapshotWithTotals } from './global/types';
import { SnapshotDetailTable } from './SnapshotDetailTable';
import { SnapshotDatepicker } from './SnapshotForm/SnapshotDatepicker';
import { UpdateSnapshotForm } from './SnapshotForm/UpdateSnapshotForm';
import { DateLong } from './ui/DateLong';
import { useSnapshots } from './use-snapshots';
import { SnapshotDetailPieChart } from './SnapshotDetailPieChart';
import { formatPieChartData } from '@/global/utils';

type SnapshotDetailPageProps = {
  snapshot: SnapshotWithTotals;
};

export const SnapshotDetailPage = (props: SnapshotDetailPageProps) => {
  const { snapshot } = props;
  const { isUpdateLoading, updateSnapshotFormHandler, deleteSnapshotHandler } =
    useSnapshots();
  const [snapshotState, setSnapshotState] =
    useState<SnapshotWithTotals>(snapshot);
  const [isEditing, setIsEditing] = useState(false);
  const [showLegend, setShowLegend] = useState(false);

  useEffect(() => {
    if (isUpdateLoading) {
      setIsEditing(false);
    }
  }, [isUpdateLoading]);

  return (
    <>
      <GlobalNav>
        <Button variant='contained' color='primary' href='/finance-tracker'>
          Back to dashboard
        </Button>
      </GlobalNav>

      <Container
        component='main'
        sx={{ display: 'flex', flexDirection: 'column', marginBottom: '200px' }}
      >
        <Box sx={{ margin: '20px 0 0' }}>
          <Typography
            variant='h3'
            sx={{ margin: '30px 0 50px', textAlign: 'center' }}
          >
            Total: £{snapshotState.total}
          </Typography>
          <SnapshotDetailOverview snapshot={snapshotState} />
        </Box>
        <Button onClick={() => setShowLegend((prevState) => !prevState)}>
          Toggle Legend
        </Button>
        <SnapshotDetailPieChart
          showLegend={showLegend}
          owners={formatPieChartData(snapshot, 'owners')}
          types={formatPieChartData(snapshot, 'types')}
          currencies={formatPieChartData(snapshot, 'currencies')}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px 0',
          }}
        >
          <LoadingButton
            loadingPosition='end'
            loading={isUpdateLoading}
            variant='contained'
            onClick={() => setIsEditing(!isEditing)}
            sx={{ margin: '10px 0 30px' }}
          >
            {isUpdateLoading
              ? 'Updating...'
              : isEditing
              ? 'Exit Update Mode'
              : 'Edit Snapshot'}
          </LoadingButton>
          <DateLong dateValue={snapshotState.snapshotDate} />
          {isEditing && (
            <SnapshotDatepicker
              snapshot={snapshotState}
              setSnapshotState={setSnapshotState}
            />
          )}
        </Box>
        {isEditing ? (
          <UpdateSnapshotForm
            snapshot={snapshotState}
            setSnapshotState={setSnapshotState}
            isUpdateLoading={isUpdateLoading}
            updateSnapshotFormHandler={updateSnapshotFormHandler}
            deleteSnapshotHandler={deleteSnapshotHandler}
          />
        ) : (
          <SnapshotDetailTable rows={snapshotState.snapshotAssets} />
        )}
      </Container>
    </>
  );
};

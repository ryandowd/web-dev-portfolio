import { LoadingButton } from '@mui/lab';
import { Box, Button, Paper, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { GlobalNav } from '@/sites/main/components/ui/GlobalNav';
import { SnapshotDetailOverview } from './SnapshotDetailOverview';
import { Snapshot } from '@/sites/finance/global/types';
import { SnapshotDetailTable } from './SnapshotDetailTable';
import { SnapshotDatepicker } from './SnapshotForm/SnapshotDatepicker';
import { UpdateSnapshotForm } from './SnapshotForm/UpdateSnapshotForm';
import { DateLong } from './ui/DateLong';
import { useSnapshots } from '../hooks/use-snapshots';
import { SnapshotDetailPieChart } from './SnapshotDetailPieChart';
import {
  formatNumberWithCommas,
  formatPieChartData,
} from '@/sites/finance/utils';
import { SnapshotAssetBarChart } from './SnapshotAssetBarChart';

type SnapshotDetailPageProps = {
  snapshot: Snapshot;
};

export const SnapshotDetailPage = (props: SnapshotDetailPageProps) => {
  const { snapshot } = props;
  const { isUpdateLoading, updateSnapshotFormHandler, deleteSnapshotHandler } =
    useSnapshots();
  const [snapshotState, setSnapshotState] = useState<Snapshot>(snapshot);
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
          {/* {snapshot.total && (
            <Typography
              variant='h3'
              sx={{ margin: '30px 0 50px', textAlign: 'center' }}
            >
              Total: £{formatNumberWithCommas(snapshot.total)}
            </Typography>
          )} */}
          <SnapshotDetailOverview snapshot={snapshotState} />
        </Box>
        <Button onClick={() => setShowLegend((prevState) => !prevState)}>
          Toggle Legend
        </Button>
        {/* <SnapshotDetailPieChart
          showLegend={showLegend}
          owners={formatPieChartData(snapshot, 'owners')}
          types={formatPieChartData(snapshot, 'types')}
          currencies={formatPieChartData(snapshot, 'currencies')}
        />
        <SnapshotAssetBarChart snapshot={snapshot} /> */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px 0 0',
          }}
        >
          <DateLong dateValue={snapshotState.snapshotDate} />
          <LoadingButton
            // loadingPosition='end'
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

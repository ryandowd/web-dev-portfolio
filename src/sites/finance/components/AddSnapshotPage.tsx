import { Container } from '@mui/system';
import { AddSnapshotForm } from './SnapshotForm/AddSnapshotForm';
import { useSnapshots } from '../hooks/use-snapshots';
import { SnapshotAssetsField, Snapshot } from '@/sites/finance/global/types';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import { dateFormat } from '@/sites/finance/global/constants';
import { Button } from '@mui/material';
import { GlobalNav } from '@/sites/main/components/ui/GlobalNav';
import { useState } from 'react';

const snapshotFieldTemplate: SnapshotAssetsField = {
  assetId: uuid(),
  assetName: '',
  assetType: 'money',
  assetValue: 0,
  assetCurrency: 'gbp',
  assetOwner: 'joint',
  difference: 0,
};

const snapshotTemplate: Snapshot = {
  snapshotId: uuid(),
  snapshotDate: dayjs(new Date()).format(dateFormat),
  snapshotAssets: [snapshotFieldTemplate],
  snapshotTotals: {
    owners: undefined,
    types: undefined,
    currencies: undefined,
  },
  monthDifference: 0,
  total: 0,
};

type AddSnapshotPageProps = {
  previousSnapshot?: Snapshot | null;
};

export const AddSnapshotPage = (props: AddSnapshotPageProps) => {
  const { previousSnapshot } = props;
  const [snapshotState, setSnapshotState] = useState<Snapshot>(
    previousSnapshot || snapshotTemplate
  );
  const { isCreateLoading, isCreateSuccess, createAddSnapshotHandler } =
    useSnapshots();

  return (
    <>
      <GlobalNav>
        <Button variant='contained' color='primary' href='/finance-tracker'>
          Back to dashboard
        </Button>
      </GlobalNav>
      <Container component='main'>
        <AddSnapshotForm
          snapshotState={snapshotState}
          setSnapshotState={setSnapshotState}
          createAddSnapshotHandler={createAddSnapshotHandler}
          isCreateLoading={isCreateLoading}
          isCreateSuccess={isCreateSuccess}
        />
      </Container>
    </>
  );
};

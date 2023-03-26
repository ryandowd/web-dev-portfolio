import { Container } from '@mui/system';
import { AddSnapshotForm } from './SnapshotForm/AddSnapshotForm';
import { useSnapshots } from './use-snapshots';
import {
  Snapshot,
  SnapshotAssetsField,
  SnapshotWithTotals,
} from './global/types';
import { uuid } from 'uuidv4';
import dayjs from 'dayjs';
import { dateFormat } from './global/constants';
import { Button } from '@mui/material';
import { GlobalNav } from '../ui/GlobalNav';
import { useState } from 'react';

const snapshotFieldTemplate: SnapshotAssetsField = {
  assetId: uuid(),
  assetName: null,
  assetType: 'money',
  assetValue: 0,
  assetCurrency: 'gbp',
  assetOwner: 'joint',
};

const snapshotTemplate: SnapshotWithTotals = {
  snapshotId: uuid(),
  snapshotDate: dayjs(new Date()).format(dateFormat),
  snapshotAssets: [snapshotFieldTemplate],
  snapshotTotals: {
    owners: undefined,
    types: undefined,
    currencies: undefined,
  },
  total: '',
};

type AddSnapshotPageProps = {
  previousSnapshot?: SnapshotWithTotals | null;
};

export const AddSnapshotPage = (props: AddSnapshotPageProps) => {
  const { previousSnapshot } = props;
  const [snapshotState, setSnapshotState] = useState<SnapshotWithTotals>(
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

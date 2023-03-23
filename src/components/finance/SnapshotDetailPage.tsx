import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import { SnapshotDetailTable } from './SnapshotDetailTable';

type SnapshotDetailPageProps = {
  snapshotId: string;
};

const snapshotFields = [
  {
    assetId: 'suncorp',
    assetName: 'Suncorp',
    assetType: 'money',
    assetValue: 1000,
    assetCurrency: 'AUD',
    assetOwner: 'Ryan',
  },
  {
    assetId: 'hsbc',
    assetName: 'HSBC',
    assetType: 'money',
    assetValue: 1000,
    assetCurrency: 'GBP',
    assetOwner: 'Kay',
  },
];

const snapshots = [
  {
    snapshotId: '123',
    snapshotDate: '2021-09-01',
    snapshotAssets: snapshotFields,
  },
  {
    snapshotId: '123',
    snapshotDate: '2021-09-01',
    snapshotAssets: snapshotFields,
  },
  {
    snapshotId: '123',
    snapshotDate: '2021-09-01',
    snapshotAssets: snapshotFields,
  },
];

export const SnapshotDetailPage = (props: SnapshotDetailPageProps) => {
  const { snapshotId } = props;

  return (
    <Container component='main'>
      <Typography variant='h1'>Snapshot Detail</Typography>
      <Typography variant='h2'>{snapshotId}</Typography>
      <SnapshotDetailTable rows={snapshotFields} />
    </Container>
  );
};

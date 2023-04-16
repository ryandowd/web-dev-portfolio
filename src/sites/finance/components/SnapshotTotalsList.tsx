import { Box } from '@mui/material';
import Link from 'next/link';
import { SnapshotDetailOverview } from './SnapshotDetailOverview';
import { Snapshot } from '@/sites/finance/global/types';

type SnapshotTotalsListProps = {
  snapshots: Snapshot[];
};

export const SnapshotTotalsList = (props: SnapshotTotalsListProps) => {
  const { snapshots } = props;

  console.log('snapshots', snapshots);

  return <h1>Hello</h1>;

  return (
    <>
      {snapshots?.map((snapshot) => {
        return (
          <Box
            key={snapshot.snapshotId}
            sx={{
              marginBottom: '40px',
              '.MuiPaper-root': {
                transition: 'all 0.3s ease-in-out',
              },
              '&:hover .MuiPaper-root': {
                transform: 'scale(1.03)',
                cursor: 'pointer',
              },
            }}
          >
            <Link href={`/finance-tracker/snapshots/${snapshot.snapshotId}`}>
              <SnapshotDetailOverview snapshot={snapshot} />
            </Link>
          </Box>
        );
      })}
    </>
  );
};

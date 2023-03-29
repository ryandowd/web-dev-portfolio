import { Box } from '@mui/material';
import Link from 'next/link';
import { SnapshotDetailOverview } from './SnapshotDetailOverview';
import { SnapshotWithTotals } from '../../sites/finance/global/types';

type SnapshotTotalsListProps = {
  snapshotsWithTotals: SnapshotWithTotals[];
};

export const SnapshotTotalsList = (props: SnapshotTotalsListProps) => {
  const { snapshotsWithTotals } = props;

  return (
    <>
      {snapshotsWithTotals?.map((snapshot) => {
        return (
          <Box key={snapshot.snapshotId} sx={{ marginBottom: '40px' }}>
            <Link href={`/finance-tracker/snapshots/${snapshot.snapshotId}`}>
              <SnapshotDetailOverview snapshot={snapshot} />
            </Link>
          </Box>
        );
      })}
    </>
  );
};

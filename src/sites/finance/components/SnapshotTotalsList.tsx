import { Box } from '@mui/material';
import Link from 'next/link';
import { SnapshotDetailOverview } from './SnapshotDetailOverview';
import { Snapshot } from '@/sites/finance/global/types';

type SnapshotTotalsListProps = {
  snapshots: Snapshot[];
};

export const SnapshotTotalsList = (props: SnapshotTotalsListProps) => {
  const { snapshots } = props;

  return (
    <>
      {snapshots?.map((snapshot) => {
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

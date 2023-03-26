import { Box } from '@mui/material';
import Link from 'next/link';
import { SnapshotDetailOverview } from './SnapshotDetailOverview';
import { SnapshotWithTotals } from './global/types';

type SnapshotTotalsListProps = {
  snapshotsWithTotals: SnapshotWithTotals[];
};

export const SnapshotTotalsList = (props: SnapshotTotalsListProps) => {
  const { snapshotsWithTotals } = props;

  return (
    <>
      {snapshotsWithTotals?.map((snapshot) => {
        return (
          <Box
            key={snapshot.snapshotId}
            sx={{
              display: 'flex',
              transition: 'background-color 0.1s ease-in-out',
              '.MuiPaper-root': {
                transition: 'all 0.4s ease-in-out',
                cursor: 'pointer',
              },
              '&:hover .MuiPaper-root': {
                transform: 'scale(1.03)',
              },
            }}
          >
            <Link
              href={`/finance-tracker/snapshots/${snapshot.snapshotId}`}
              style={{ flex: '1' }}
            >
              <SnapshotDetailOverview snapshot={snapshot} />
            </Link>
          </Box>
        );
      })}
    </>
  );
};

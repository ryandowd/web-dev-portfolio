import { Box } from '@mui/material';
import Link from 'next/link';
import { SnapshotDetailOverview } from './SnapshotDetailOverview';

export const SnapshotTotalsList = (props) => {
  const { snapshotsTotals } = props;

  console.log('snapshotsTotals', snapshotsTotals);

  return snapshotsTotals?.map((snapshot) => {
    return (
      <Box sx={{ display: 'flex' }}>
        <Link
          href={`/finance-tracker/snapshots/${snapshot.snapshotId}`}
          style={{ flex: '1' }}
        >
          <SnapshotDetailOverview snapshot={snapshot} />
        </Link>
      </Box>
    );
  });
};

import { Snapshot } from '@/sites/finance/global/types';
import { Box } from '@mui/system';

type SnapshotTotalsListProps = {
  snapshots: Snapshot[];
};

export const SnapshotTotalsList = (props: SnapshotTotalsListProps) => {
  console.log('props', props);
  const { snapshots } = props;
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
            {/* <Link href={`/finance-tracker/snapshots/${snapshot.snapshotId}`}>
              <SnapshotDetailOverview snapshot={snapshot} />
            </Link> */}
          </Box>
        );
      })}
    </>
  );
};

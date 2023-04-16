import dayjs from 'dayjs';

import { formatNumberWithCommas } from '@/sites/finance/utils';
import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material';
import { Typography, Paper } from '@mui/material';
import { Box } from '@mui/system';
import { Snapshot } from '@/sites/finance/global/types';
import { SnapshotDetailOverviewTotal } from './SnapshotDetailOverviewTotal';

type SnapshotDetailOverviewProps = {
  snapshot: Snapshot;
  isTransparent?: boolean;
};

export const SnapshotDetailOverview = (props: SnapshotDetailOverviewProps) => {
  const { snapshot, isTransparent } = props;
  const { monthDifference, total, snapshotDate, snapshotId } = snapshot;
  console.log({ monthDifference, total, snapshotDate, snapshotId });

  const isDifferenceNegative = (snapshot.monthDifference || false) < 0;
  const differenceColour = isDifferenceNegative ? 'red' : 'green';
  const differenceIcon = isDifferenceNegative ? (
    <ArrowDropDown sx={{ color: differenceColour }} />
  ) : (
    <ArrowDropUp sx={{ color: differenceColour }} />
  );

  const transparentStyles = isTransparent
    ? {
        backgroundColor: 'transparent',
        boxShadow: 'none',
      }
    : {};

  return (
    <Paper
      // key={snapshot.snapshotId}
      sx={{
        display: 'flex',
        margin: '10px',
        width: '100%',
        borderRadius: 0,
        ...transparentStyles,
      }}
    >
      Hello
    </Paper>
  );
};

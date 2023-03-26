import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import { humanDateFormat } from './global/constants';
import { SnapshotWithTotals } from './global/types';
import { formatNumber } from './global/utils';

type SnapshotDetailOverviewProps = {
  snapshot: SnapshotWithTotals;
};

export const SnapshotDetailOverview = (props: SnapshotDetailOverviewProps) => {
  const { snapshot } = props;

  return (
    <Paper
      key={snapshot.snapshotId}
      sx={{
        display: 'flex',
        margin: '10px',
        width: '100%',
      }}
    >
      <Box
        sx={{
          padding: '20px',
          display: 'flex',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: '0 0 25%',
          }}
        >
          <Typography variant='h5' sx={{ margin: '0 0 10px' }}>
            {dayjs(snapshot.snapshotDate).format(humanDateFormat)}
          </Typography>
          <Typography variant='h5'>Total: £{snapshot.total}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-around',
          }}
        >
          {Object.entries(snapshot.snapshotTotals).map((totalTypes, index) => {
            const capitalise =
              totalTypes[0] === 'currencies' ? 'uppercase' : 'capitalize';

            return (
              <Box key={index}>
                <Typography
                  variant='h5'
                  key={totalTypes[0]}
                  sx={{ textTransform: 'capitalize' }}
                >
                  {totalTypes[0]}
                </Typography>
                {Object.entries(totalTypes[1]).map((total) => {
                  return (
                    <Box
                      key={total[0]}
                      sx={{ display: 'flex', margin: '10px 0' }}
                    >
                      <Typography
                        sx={{
                          textTransform: capitalise,
                        }}
                      >
                        {`${total[0]}: £${formatNumber(total[1])}`}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Paper>
  );
};

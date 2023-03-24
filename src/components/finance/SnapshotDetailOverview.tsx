import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import { findGBPTotal } from './global/utils';
import { currencySymbols, humanDateFormat } from './global/constants';
import { useMemo } from 'react';

export const SnapshotDetailOverview = (props) => {
  const { snapshot, noHover } = props;

  const snapshotTotalGBP = useMemo(
    () => findGBPTotal(snapshot.snapshotTotals),
    [snapshot.snapshotTotals]
  );

  return (
    <Paper
      key={snapshot.snapshotId}
      sx={{
        display: 'flex',
        margin: '10px',
        width: '100%',
        transition: 'background-color 0.1s ease-in-out',
        '&:hover': !noHover && {
          backgroundColor: 'rgba(40, 56, 106, 0.01)',
          cursor: 'pointer',
        },
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
          <Typography variant='h5'>
            Total: £{snapshotTotalGBP.toLocaleString()}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-around',
          }}
        >
          {Object.entries(snapshot.snapshotTotals).map((totalTypes) => {
            const capitalise =
              totalTypes[0] === 'currencies' ? 'uppercase' : 'capitalize';
            return (
              <Box>
                <Typography
                  variant='h5'
                  key={totalTypes[0]}
                  sx={{ textTransform: 'capitalize' }}
                >
                  {totalTypes[0]}
                </Typography>
                {Object.entries(totalTypes[1]).map((total) => {
                  const currencySymbol =
                    currencySymbols[total[0].toUpperCase()] || '';
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
                        {`${
                          total[0]
                        }: ${currencySymbol}${total[1].toLocaleString()}`}
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

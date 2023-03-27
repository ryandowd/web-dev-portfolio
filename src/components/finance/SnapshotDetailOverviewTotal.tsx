import { Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { SnapshotWithTotals } from './global/types';
import { formatNumber } from './global/utils';

type SnapshotDetailOverviewTotalProps = {
  snapshot: SnapshotWithTotals;
};

export const SnapshotDetailOverviewTotal = (
  props: SnapshotDetailOverviewTotalProps
) => {
  const { snapshot } = props;
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around',
        flexDirection: {
          xs: 'column',
          sm: 'row',
        },
        textAlign: {
          xs: 'center',
          sm: 'left',
        },
      }}
    >
      {Object.entries(snapshot.snapshotTotals)
        .reverse()
        .map((totalTypes, index) => {
          if (totalTypes[0] === 'currencies') return null;

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
                    sx={{
                      display: 'flex',
                      margin: '10px 0',
                      flexDirection: {
                        xs: 'column',
                        sm: 'row',
                      },
                      alignItems: {
                        xs: 'center',
                        sm: 'flex-start',
                      },
                      fontFamily: theme.typography.body1,
                    }}
                  >
                    <Typography sx={{ display: 'flex', justifyContent: 'row' }}>
                      <Typography
                        sx={{ textTransform: 'capitalize', marginRight: '5px' }}
                      >
                        {total[0]}:
                      </Typography>
                      <Typography>£{formatNumber(total[1])}</Typography>
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          );
        })}
    </Box>
  );
};

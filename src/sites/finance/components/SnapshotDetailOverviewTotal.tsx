import { Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { Snapshot } from '@/sites/finance/global/types';
import { formatNumberWithCommas } from '../utils';

type SnapshotDetailOverviewTotalProps = {
  snapshot: Snapshot;
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
        justifyContent: 'space-between',
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
        textAlign: {
          xs: 'center',
          sm: 'left',
        },
      }}
    >
      {Object.entries(snapshot.snapshotTotals).map((totalTypes, index) => {
        return (
          <Box
            key={index}
            sx={{
              border: `1px solid ${theme.palette.grey[200]}`,
              backgroundColor: 'white',
              flex: {
                xs: '0 0 100%',
                md: '0 0 32%',
              },
              padding: '10px 15px 15px 15px',
              alignItems: {
                xs: 'center',
              },
            }}
          >
            <Typography
              variant='h5'
              key={totalTypes[0]}
              sx={{
                textTransform: 'capitalize',
                textDecoration: 'underline',
                textAlign: 'center',
                paddingBottom: '15px',
                marginBottom: '20px',
                borderBottom: `1px solid ${theme.palette.grey[200]}`,
              }}
            >
              {totalTypes[0]}
            </Typography>
            {Object.entries(totalTypes[1]).map((total) => {
              const differenceColour =
                total[1].difference < 0 ? 'red' : 'green';

              const currentValue = `£${formatNumberWithCommas(
                // @ts-ignore
                total[1].current || total[1]
              )}`;
              const diffenceValue = isNaN(total[1].difference)
                ? 'N/A'
                : `${formatNumberWithCommas(total[1].difference)}`;

              return (
                <Box
                  key={total[0]}
                  sx={{
                    display: 'flex',
                    margin: '10px 0',
                    flexDirection: {
                      xs: 'row',
                      sm: 'row',
                    },

                    alignItems: {
                      xs: 'center',
                      sm: 'flex-start',
                    },
                    justifyContent: {
                      sm: 'flex-start',
                    },
                    fontFamily: theme.typography.body1,
                  }}
                >
                  <Typography
                    sx={{
                      textTransform: 'uppercase',
                      marginRight: '5px',
                      flexBasis: '30%',
                    }}
                  >
                    <strong>{total[0]}:</strong>
                  </Typography>
                  <Typography sx={{ width: '100px' }}>
                    {currentValue}
                  </Typography>
                  <Typography sx={{ color: differenceColour }}>
                    {diffenceValue}
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

import dayjs from 'dayjs';

import { formatNumberWithCommas } from '@/sites/finance/utils';
// import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
// import ArrowDropUp from '@mui/icons-material/ArrowDropUp';
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

  // @TODO - Fix this
  const isDifferenceNegative = (monthDifference || 0) < 0;

  const differenceColour = isDifferenceNegative ? 'red' : 'green';

  // const differenceIcon = isDifferenceNegative ? (
  //   <ArrowDropDown sx={{ color: differenceColour }} />
  // ) : (
  //   <ArrowDropUp sx={{ color: differenceColour }} />
  // );

  return (
    <Paper
      key={snapshotId}
      sx={{
        display: 'flex',
        margin: '10px',
        width: '100%',
        borderRadius: 0,
      }}
    >
      <Box
        key={snapshotId}
        sx={{
          padding: '20px',
          display: {
            sm: 'flex',
          },
          width: '100%',
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flex: '0 0 20%',
            textAlign: {
              xs: 'center',
              sm: 'left',
            },
            flexDirection: 'column',
            marginBottom: {
              xs: '20px',
              lg: 0,
            },
            alignItems: {
              xs: 'center',
              lg: 'flex-start',
            },
          }}
        >
          <Box
            sx={{
              marginBottom: {
                xs: '10px',
                md: '30px',
              },
              display: 'flex',
            }}
          >
            <Typography
              variant='h5'
              sx={{
                fontSize: {
                  xs: '3rem',
                  md: '2.5rem',
                },
                padding: '5px 5px 5px 0',
                color: '#b7b7b7',
              }}
            >
              {dayjs(snapshotDate).format('DD')}
            </Typography>
            <Typography
              variant='h5'
              sx={{
                fontSize: {
                  xs: '3rem',
                  md: '2.5rem',
                },
                padding: '5px 5px 5px 0',
                color: '#424242',
              }}
            >
              {dayjs(snapshotDate).format('MMM')}
            </Typography>
            <Typography
              variant='h5'
              sx={{
                fontSize: {
                  xs: '3rem',
                  md: '2.5rem',
                },
                padding: '5px',
                color: '#7f7f7f',
              }}
            >
              {dayjs(snapshotDate).format('YYYY')}
            </Typography>
          </Box>
          {total && (
            <Typography variant='h5' sx={{ fontSize: '2.2rem' }}>
              £{formatNumberWithCommas(total)}
            </Typography>
          )}
          {monthDifference ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: {
                  xs: '20px',
                  md: '5px',
                },
              }}
            >
              <Typography
                variant='h5'
                sx={{
                  color: differenceColour,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '2rem',
                }}
              >
                £{formatNumberWithCommas(monthDifference)}
              </Typography>
              {/* {differenceIcon} */}
            </Box>
          ) : null}
        </Box>

        <SnapshotDetailOverviewTotal snapshot={snapshot} />
      </Box>
    </Paper>
  );
};

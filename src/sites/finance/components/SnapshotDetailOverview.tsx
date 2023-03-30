import { theme } from '@/styles/theme';
import { formatNumberWithCommas } from '@/sites/finance/utils';
import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material';
import { Typography, Paper } from '@mui/material';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import { humanDateFormat } from '@/sites/finance/global/constants';
import { Snapshot } from '@/sites/finance/global/types';
import { formatNumber } from '@/sites/finance/global/utils';
import { SnapshotDetailOverviewTotal } from './SnapshotDetailOverviewTotal';

type SnapshotDetailOverviewProps = {
  snapshot: Snapshot;
};

export const SnapshotDetailOverview = (props: SnapshotDetailOverviewProps) => {
  const { snapshot } = props;
  const isDifferenceNegative = snapshot.monthDifference < 0;
  const differenceColour = isDifferenceNegative ? 'red' : 'green';
  const differenceIcon = isDifferenceNegative ? (
    <ArrowDropDown sx={{ color: differenceColour }} />
  ) : (
    <ArrowDropUp sx={{ color: differenceColour }} />
  );

  return (
    <Paper
      key={snapshot.snapshotId}
      sx={{
        display: 'flex',
        margin: '10px',
        width: '100%',
        borderRadius: 0,
      }}
    >
      <Box
        key={snapshot.snapshotId}
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
              margin: '0 0 10px',
              display: 'flex',
              // flexDirection: 'column',
            }}
          >
            {/* <Box sx={{ display: 'flex' }}> */}
            {/* <Typography
              variant='h5'
              sx={{
                fontSize: {
                  xs: '1.5rem',
                  md: '2.5rem',
                },
                padding: '5px',
                color: '#e9e9e9',
              }}
            >
              {dayjs(snapshot.snapshotDate).format('DD')}
            </Typography> */}
            <Typography
              variant='h5'
              sx={{
                fontSize: {
                  xs: '3rem',
                  md: '2.5rem',
                },
                padding: '5px',
                color: '#424242',
              }}
            >
              {dayjs(snapshot.snapshotDate).format('MMM')}
            </Typography>

            {/* </Box> */}
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
              {dayjs(snapshot.snapshotDate).format('YYYY')}
            </Typography>
          </Box>
          <Typography variant='h5' sx={{ fontSize: '2rem' }}>
            £{formatNumberWithCommas(snapshot.total)}
          </Typography>
          {snapshot.monthDifference ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: '20px',
              }}
            >
              <Typography
                variant='h5'
                sx={{
                  color: differenceColour,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                £{formatNumberWithCommas(snapshot.monthDifference)}
              </Typography>
              {differenceIcon}
            </Box>
          ) : null}
        </Box>

        <SnapshotDetailOverviewTotal snapshot={snapshot} />
      </Box>
    </Paper>
  );
};

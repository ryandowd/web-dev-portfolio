import { theme } from '@/styles/theme';
import { formatNumberWithCommas } from '@/sites/finance/utils';
import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material';
import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import { humanDateFormat } from '@/sites/finance/global/constants';
import { SnapshotWithTotals } from '@/sites/finance/global/types';
import { formatNumber } from '@/sites/finance/global/utils';
import { SnapshotDetailOverviewTotal } from './SnapshotDetailOverviewTotal';

type SnapshotDetailOverviewProps = {
  snapshot: SnapshotWithTotals;
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
          display: 'flex',
          width: '100%',
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flex: '0 0 35%',
            textAlign: {
              xs: 'center',
              sm: 'left',
            },
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              margin: '0 0 10px',
              display: 'flex',
              alignItems: 'flex-start',
            }}
          >
            <Typography
              variant='h5'
              sx={{
                fontSize: {
                  xs: '1.5rem',
                  md: '2.5rem',
                },
                padding: '5px',
                color: '#424242',
              }}
            >
              {dayjs(snapshot.snapshotDate).format('YYYY')}
            </Typography>
            <Typography
              variant='h5'
              sx={{
                fontSize: {
                  xs: '1.5rem',
                  md: '2.5rem',
                },
                padding: '5px',
                color: '#7f7f7f',
              }}
            >
              {dayjs(snapshot.snapshotDate).format('MMM')}
            </Typography>
            <Typography
              variant='h5'
              sx={{
                fontSize: {
                  xs: '1.5rem',
                  md: '2.5rem',
                },
                padding: '5px',
                color: '#d0d0d0',
              }}
            >
              {dayjs(snapshot.snapshotDate).format('DD')}
            </Typography>
          </Box>
          <Typography variant='h5'>
            Total: £{formatNumberWithCommas(snapshot.total)}
          </Typography>
          <Typography
            variant='h5'
            sx={{
              color: 'white',
              backgroundColor: differenceColour,
              padding: '7px',
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontFamily: theme.typography.body1,
            }}
          >
            Total Difference: £
            {formatNumberWithCommas(snapshot.monthDifference)}
            {differenceIcon}
          </Typography>
        </Box>

        <SnapshotDetailOverviewTotal snapshot={snapshot} />
      </Box>
    </Paper>
  );
};

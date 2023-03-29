import { Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { humanDateFormat, dateFormat } from '../../global/constants';
import { SnapshotWithTotals } from '../../global/types';

type SnapshotDatepickerProps = {
  snapshot: SnapshotWithTotals;
  setSnapshotState: (snapshot: SnapshotWithTotals) => void;
};

export const SnapshotDatepicker = (props: SnapshotDatepickerProps) => {
  const { snapshot, setSnapshotState } = props;

  function dateOnChangeHandler(date: any) {
    // @ts-ignore comment
    setSnapshotState((prevState: SnapshotWithTotals) => {
      const thigy = {
        ...prevState,
        snapshotDate: date.format(dateFormat),
      };

      console.log('thigy', thigy);
      return thigy;
    });
  }

  return (
    <Box sx={{ display: 'flex', margin: '20px 0', alignItems: 'center' }}>
      <DatePicker
        format={humanDateFormat}
        value={dayjs(snapshot.snapshotDate)}
        onChange={dateOnChangeHandler}
        sx={{ fontSize: '2rem' }}
      />
    </Box>
  );
};

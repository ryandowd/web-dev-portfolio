import { Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { humanDateFormat, dateFormat } from '../global/constants';

type SnapshotDatepickerProps = {
  snapshot: any;
  setSnapshotState: any;
};

export const SnapshotDatepicker = (props: SnapshotDatepickerProps) => {
  const { snapshot, setSnapshotState } = props;

  function dateOnChangeHandler(date: any) {
    setSnapshotState((prevState) => {
      return {
        ...prevState,
        snapshotDate: date.format(dateFormat),
      };
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

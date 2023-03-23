import { Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { humanDateFormat, dateFormat } from '../global/constants';

type SnapshotDateProps = {
  snapshotState: any;
  snapshotDate: any;
  setSnapshotDate: any;
};

export const SnapshotDate = (props: SnapshotDateProps) => {
  const { snapshotDate, setSnapshotDate, snapshotState } = props;

  //   useEffect(() => {
  //     setSnapshotDate(snapshotState.snapshotDate);
  //   }, [snapshotState.snapshotDate]);

  function dateOnChangeHandler(date: any) {
    // console.log('date', date.format(dateFormat));
    setSnapshotDate(date.format(dateFormat));
  }

  //   console.log('snapshotDateValue', snapshotDateValue.format(dateFormat));
  //   console.log(
  //     ' dayjs(new Date()).format(dateFormat)',
  //     dayjs(new Date()).format(dateFormat)
  //   );

  //   console.log('snapshotDateValue', snapshotDateValue.format(dateFormat));

  return (
    <>
      <Typography variant='h5'>
        New snapshot for {dayjs(snapshotDate).format('DD MMMM YYYY')}
      </Typography>
      <DatePicker
        format={humanDateFormat}
        value={dayjs(snapshotDate)}
        onChange={dateOnChangeHandler}
      />
    </>
  );
};

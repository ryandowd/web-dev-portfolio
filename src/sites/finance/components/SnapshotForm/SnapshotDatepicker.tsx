import { Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { humanDateFormat, dateFormat } from '../../global/constants';
import { Snapshot } from '../../global/types';

type SnapshotDatepickerProps = {
  snapshot: Snapshot;
  setSnapshotState: (snapshot: Snapshot) => void;
};

export const SnapshotDatepicker = (props: SnapshotDatepickerProps) => {
  const { snapshot, setSnapshotState } = props;

  function dateOnChangeHandler(date: any) {
    // @ts-ignore comment
    setSnapshotState((prevState: Snapshot) => {
      const thigy = {
        ...prevState,
        snapshotDate: date.format(dateFormat),
      };

      return thigy;
    });
  }

  return (
    <Box sx={{ display: 'flex', margin: '20px 0 40px', alignItems: 'center' }}>
      <DatePicker
        format={humanDateFormat}
        value={dayjs(snapshot.snapshotDate)}
        onChange={dateOnChangeHandler}
        sx={{ fontSize: '2rem' }}
      />
    </Box>
  );
};

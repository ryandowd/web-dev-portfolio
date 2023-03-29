import { Typography } from '@mui/material';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import dayjs from 'dayjs';

type DateLongProps = {
  dateValue: string;
};

export const DateLong = (props: DateLongProps) => {
  const { dateValue } = props;
  dayjs.extend(advancedFormat);

  return (
    <Typography variant='h5' sx={{ marginRight: '10px' }}>
      Snapshot for <strong>{dayjs(dateValue).format('Do MMMM YYYY')}</strong>
    </Typography>
  );
};

import { Button, IconButton } from '@mui/material';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import ArrowUpward from '@mui/icons-material/ArrowUpward';

type TableSortProps = {
  handler: (sortBy: string, isDescending?: boolean) => void;
  sortValue: string;
};

export const TableSort = (props: TableSortProps) => {
  const { handler, sortValue } = props;
  return (
    <>
      <IconButton onClick={() => handler(sortValue)}>
        <ArrowUpward />
      </IconButton>
      <IconButton onClick={() => handler(sortValue, true)}>
        <ArrowDownward />
      </IconButton>
    </>
  );
};

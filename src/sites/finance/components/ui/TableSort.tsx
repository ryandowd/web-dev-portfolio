import { Button, IconButton } from '@mui/material';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';

type TableSortProps = {
  handler: (sortBy: string, isDescending?: boolean) => void;
  sortValue: string;
};

export const TableSort = (props: TableSortProps) => {
  const { handler, sortValue } = props;
  return (
    <>
      <IconButton>
        <ArrowUpward onClick={() => handler(sortValue)} />
      </IconButton>
      <IconButton>
        <ArrowDownward onClick={() => handler(sortValue, true)} />
      </IconButton>
    </>
  );
};

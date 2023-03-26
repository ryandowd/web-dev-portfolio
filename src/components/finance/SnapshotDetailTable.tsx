import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { SnapshotAssetsField } from './global/types';
import { sortArrayByValue } from './global/utils';

type SnapshotDetailTableProps = {
  rows: SnapshotAssetsField[];
};

export const SnapshotDetailTable = (props: SnapshotDetailTableProps) => {
  const { rows } = props;
  const [rowsState, setRowsState] = useState(rows);

  useEffect(() => {
    console.log('changed');
  }, [rowsState]);

  function sortHandler(sortBy: string, isDescending = false) {
    setRowsState((prevState: any) => {
      if (isDescending) {
        return [...sortArrayByValue(prevState, sortBy)];
      } else {
        return [...sortArrayByValue(prevState, sortBy).reverse()];
      }
    });
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Asset Name</TableCell>
            <TableCell>
              Asset Type{' '}
              <Button onClick={() => sortHandler('assetType')}>Sort Up</Button>
              <Button onClick={() => sortHandler('assetType', true)}>
                Sort Down
              </Button>
            </TableCell>
            <TableCell>
              Value
              <Button onClick={() => sortHandler('assetValue')}>Sort Up</Button>
              <Button onClick={() => sortHandler('assetValue', true)}>
                Sort Down
              </Button>
            </TableCell>
            <TableCell>
              Currency
              <Button onClick={() => sortHandler('assetCurrency')}>
                Sort Up
              </Button>
              <Button onClick={() => sortHandler('assetCurrency', true)}>
                Sort Down
              </Button>
            </TableCell>
            <TableCell>
              Owner
              <Button onClick={() => sortHandler('assetOwner')}>Sort Up</Button>
              <Button onClick={() => sortHandler('assetOwner', true)}>
                Sort Down
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsState.map((row: any) => {
            return (
              <TableRow
                key={row.assetId}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '.MuiTableCell-root': {
                    fontSize: '1rem',
                    textTransform: 'uppercase',
                  },
                }}
              >
                <TableCell>{row.assetName}</TableCell>
                <TableCell>{row.assetType}</TableCell>
                <TableCell>
                  {Number(row.assetValue).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell>{row.assetCurrency}</TableCell>
                <TableCell>{row.assetOwner}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

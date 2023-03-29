import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { SnapshotAssetsField } from '@/sites/finance/global/types';
import { sortArrayByValue } from '@/sites/finance/global/utils';

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
      <Table
        sx={{
          minWidth: 650,
          '.MuiTableRow-root:nth-of-type(even)': {
            backgroundColor: '#faf9f9',
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>Asset Name</TableCell>
            <TableCell>
              Value
              <Button onClick={() => sortHandler('assetValue')}>Sort Up</Button>
              <Button onClick={() => sortHandler('assetValue', true)}>
                Sort Down
              </Button>
            </TableCell>
            <TableCell>
              Asset Type{' '}
              <Button onClick={() => sortHandler('assetType')}>Sort Up</Button>
              <Button onClick={() => sortHandler('assetType', true)}>
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
            const differenceColour =
              row.difference < 0
                ? 'rgba(255, 215, 215, 0.6)'
                : row.difference > 0
                ? 'rgba(192, 255, 213, 0.6)'
                : 'transparent';
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
                <TableCell sx={{ backgroundColor: differenceColour }}>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography>
                      {Number(row.assetValue).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </Typography>
                    <Typography
                    // sx={{
                    //   color: 'black',
                    //   // border: `1px solid ${differenceColour}`,
                    //   backgroundColor: `${differenceColour}`,
                    //   padding: '5px 10px',
                    // }}
                    >
                      {Number(row.difference).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{row.assetType}</TableCell>
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

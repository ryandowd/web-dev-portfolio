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
import {
  CurrencySymbols,
  SnapshotAssetsField,
} from '@/sites/finance/global/types';
import { sortArrayByValue } from '@/sites/finance/global/utils';
import { formatNumberWithCommas } from '../utils';
import { TableSort } from './ui/TableSort';
import { currencySymbols } from '@/sites/finance/global/constants';

type SnapshotDetailTableProps = {
  rows: SnapshotAssetsField[];
};

export const SnapshotDetailTable = (props: SnapshotDetailTableProps) => {
  const { rows } = props;
  const [rowsState, setRowsState] = useState(rows);

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
          '.MuiTableCell-head': {
            fontSize: '1.2rem',
            textTransform: 'uppercase',
            fontWeight: 700,
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography>Asset Name</Typography>
            </TableCell>
            <TableCell>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>Value</Typography>
                <TableSort handler={sortHandler} sortValue={'assetValue'} />
              </Box>
            </TableCell>
            <TableCell>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>Asset Type</Typography>
                <TableSort handler={sortHandler} sortValue={'assetType'} />
              </Box>
            </TableCell>
            <TableCell>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>Currency</Typography>
                <TableSort handler={sortHandler} sortValue={'assetCurrency'} />
              </Box>
            </TableCell>
            <TableCell>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>Owner</Typography>
                <TableSort handler={sortHandler} sortValue={'assetOwner'} />
              </Box>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsState.map((row: any) => {
            console.log('row.difference', row.difference);
            console.log('row.assetValue', row.assetValue);
            const differenceValue =
              row.difference === 'currencychange'
                ? 'Currency change'
                : formatNumberWithCommas(row.difference);

            const differenceColour =
              row.difference === 'currencychange'
                ? 'rgba(255, 227, 135, 0.6)'
                : row.difference < 0
                ? 'rgba(255, 215, 215, 0.6)'
                : row.difference > 0
                ? 'rgba(192, 255, 213, 0.6)'
                : 'transparent';

            let currencySymbol =
              currencySymbols[
                row.assetCurrency.toUpperCase() as keyof CurrencySymbols
              ];

            return (
              <TableRow
                key={row.assetId}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '.MuiTableCell-root': {
                    fontSize: '1rem',
                  },
                }}
              >
                <TableCell>{row.assetName}</TableCell>
                <TableCell sx={{ backgroundColor: differenceColour }}>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography>
                      {currencySymbol}
                      {formatNumberWithCommas(row.assetValue)}
                    </Typography>
                    <Typography>{differenceValue}</Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ textTransform: 'capitalize' }}>
                  {row.assetType}
                </TableCell>
                <TableCell sx={{ textTransform: 'uppercase' }}>
                  {row.assetCurrency}
                </TableCell>
                <TableCell sx={{ textTransform: 'capitalize' }}>
                  {row.assetOwner}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

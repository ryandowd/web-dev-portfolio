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
import { formatNumberWithCommas } from '../utils';
import { TableSort } from './ui/TableSort';

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
            const differenceColour =
              row.difference < 0
                ? 'rgba(255, 215, 215, 0.6)'
                : row.difference > 0
                ? 'rgba(192, 255, 213, 0.6)'
                : 'transparent';

            const differenceValue =
              row.difference === 'nomatch'
                ? 'Currency change'
                : formatNumberWithCommas(row.difference);
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
                      {formatNumberWithCommas(row.assetValue)}
                    </Typography>
                    <Typography>{differenceValue}</Typography>
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

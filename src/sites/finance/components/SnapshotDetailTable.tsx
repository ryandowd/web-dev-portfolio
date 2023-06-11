import {
  Container,
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
import { useMemo } from 'react';
import {
  CurrencySymbols,
  SnapshotAssetsField,
} from '@/sites/finance/global/types';
import { formatNumberWithCommas } from '../utils';
import { currencySymbols } from '@/sites/finance/global/constants';

type SnapshotDetailTableProps = {
  rows: SnapshotAssetsField[];
};

export const SnapshotDetailTable = (props: SnapshotDetailTableProps) => {
  const { rows } = props;

  const rowsGroupedByOwner = useMemo(() => {
    return rows.reduce((acc: any, curr: any) => {
      if (!acc[curr.assetOwner]) {
        acc[curr.assetOwner] = [];
      }
      acc[curr.assetOwner].push(curr);
      return acc;
    }, []);
  }, [rows]);

  const ownersAssetsTables = Object.keys(rowsGroupedByOwner).map((owner) => {
    return (
      <TableContainer component={Paper} sx={{ marginY: 6 }} key={owner}>
        <Typography
          variant={'h3'}
          sx={{ textTransform: 'uppercase', textAlign: 'center', marginY: 3 }}
        >
          {owner}
        </Typography>
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
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography>Asset Type</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography>Currency</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography>Owner</Typography>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsGroupedByOwner[owner].map((row: any) => {
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
  });

  return <Container>{ownersAssetsTables}</Container>;
};

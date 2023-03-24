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
import { sortArrayByValue } from './global/utils';

// assetId: 'suncorp',
// assetName: 'Suncorp',
// assetType: 'money',
// assetValue: 1000,
// assetCurrency: 'AUD',
// assetOwner: 'Ryan',

export const SnapshotDetailTable = (props) => {
  const { rows } = props;
  const [rowsState, setRowsState] = useState(rows);

  useEffect(() => {
    console.log('changed');
  }, [rowsState]);

  function sortHandler(sortBy: string, isDescending = false) {
    setRowsState((prevState) => {
      if (isDescending) {
        console.log('1');
        return [...sortArrayByValue(prevState, sortBy)];
      } else {
        console.log('2');
        return [...sortArrayByValue(prevState, sortBy).reverse()];
      }
    });
  }

  console.log('rowsState', rowsState);

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
            <TableCell>Currency</TableCell>
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
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{row.assetName}</TableCell>
                <TableCell>{row.assetType}</TableCell>
                <TableCell>{row.assetValue}</TableCell>
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

{
  /* 
 (
            <TableRow
              key={row.assetId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='right'>{row.calories}</TableCell>
              <TableCell align='right'>{row.calories}</TableCell>
              <TableCell align='right'>{row.calories}</TableCell>
              <TableCell align='right'>{row.calories}</TableCell>
              {/* <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='right'>{row.calories}</TableCell>
              <TableCell align='right'>{row.fat}</TableCell>
              <TableCell align='right'>{row.carbs}</TableCell>
              <TableCell align='right'>{row.protein}</TableCell> */
}
//     </TableRow>
//   ))} */}

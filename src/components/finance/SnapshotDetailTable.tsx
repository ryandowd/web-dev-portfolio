import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

// assetId: 'suncorp',
// assetName: 'Suncorp',
// assetType: 'money',
// assetValue: 1000,
// assetCurrency: 'AUD',
// assetOwner: 'Ryan',

export const SnapshotDetailTable = (props) => {
  const { rows } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Asset Type</TableCell>
            <TableCell>Asset Name</TableCell>
            <TableCell>Owner</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Currency</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => {
            return (
              <TableRow
                key={row.assetId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{row.assetType}</TableCell>
                <TableCell>{row.assetName}</TableCell>
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

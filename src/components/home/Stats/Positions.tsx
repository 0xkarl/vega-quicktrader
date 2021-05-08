import { FC } from 'react';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { useMarkets } from 'hooks/markets';

const Positions: FC = () => {
  const { positions } = useMarkets();

  return (
    <Box p={2}>
      <Table aria-label='Loans' size={'small'}>
        <TableHead>
          <TableRow>
            <TableCell>Market</TableCell>
            <TableCell>Settled In</TableCell>
            <TableCell align='right'>Open Volume</TableCell>
            <TableCell align='right'>Average Entry Price</TableCell>
            <TableCell align='right'>Mark Price</TableCell>
            <TableCell align='right'>Allocated Margin</TableCell>
            <TableCell align='right'>Unrealised PNL</TableCell>
            <TableCell align='right'>Realised PNL</TableCell>
            <TableCell align='right'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {positions.map((position, i) => (
            <TableRow key={i}>
              <TableCell component='th' scope='row'>
                {position.market.name}
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>{position.openVolume}</TableCell>
              <TableCell align='right'>
                {position.averageEntryPrice /
                  Math.pow(10, position.market.decimalPlaces)}
              </TableCell>
              <TableCell align='right'>-</TableCell>
              <TableCell align='right'>-</TableCell>
              <TableCell align='right'>
                {position.unrealisedPNL /
                  Math.pow(10, position.market.decimalPlaces)}
              </TableCell>
              <TableCell align='right'>
                {position.unrealisedPNL /
                  Math.pow(10, position.market.decimalPlaces)}
              </TableCell>
              <TableCell align='right'>-</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Positions;

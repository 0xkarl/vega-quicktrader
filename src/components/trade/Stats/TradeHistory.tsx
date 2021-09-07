import { FC } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { useParty } from 'contexts/party';
import { LG, SM } from 'components/shared/Screen';

const useStyles = makeStyles((theme) => ({
  smTradeRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    '&:not(:first-child)': {
      btradeTop: `1px solid ${theme.palette.grey[900]}`,
    },
  },
}));

const Trades: FC = () => {
  const classes = useStyles();
  const { trades, isLoadingTrades } = useParty();

  return (
    <Box p={2}>
      {isLoadingTrades ? (
        <Box>Loading...</Box>
      ) : !trades.length ? (
        <Box>No trades found.</Box>
      ) : (
        <>
          <LG>
            <Table aria-label='Loans' size={'small'}>
              <TableHead>
                <TableRow>
                  <TableCell>Market</TableCell>
                  <TableCell align='right'>Size</TableCell>
                  <TableCell align='right'>Price</TableCell>
                  <TableCell align='right'>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {trades.map((trade) => (
                  <TableRow key={trade.id}>
                    <TableCell component='th' scope='row'>
                      {trade.market.tradableInstrument.instrument.code}
                    </TableCell>
                    <TableCell align='right'>{trade.size}</TableCell>
                    <TableCell align='right'>
                      {trade.price / Math.pow(10, trade.market.decimalPlaces)}
                    </TableCell>
                    <TableCell align='right'>{trade.createdAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </LG>
          <SM>
            {trades.map((trade) => (
              <Box className={classes.smTradeRow} key={trade.id} py={2}>
                <Box>Market</Box>
                <Box>{trade.market.tradableInstrument.instrument.code}</Box>
                <Box>Size</Box>
                <Box>{trade.size}</Box>
                <Box>Price</Box>
                <Box>
                  {trade.price / Math.pow(10, trade.market.decimalPlaces)}
                </Box>
                <Box>Time</Box>
                <Box>{trade.createdAt}</Box>
              </Box>
            ))}
          </SM>
        </>
      )}
    </Box>
  );
};

export default Trades;

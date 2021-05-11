import { FC, useEffect } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { gql, useQuery } from '@apollo/client';

import { Trade } from 'vega/types';
import { client } from 'vega/ws';

import { useWallet } from 'hooks/vega-wallet';
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

const QUERY = `
  id
  price
  market {
    id
    name
    decimalPlaces
    tradableInstrument {
      instrument {
        code
      }
    }
  }
  size
  createdAt
`;

const TRADES_QUERY = gql`
  query($partyId: ID!) {
    party(id: $partyId) {
      trades {
        ${QUERY}
      }
    }
  }
`;

const TRADES_SUBSCRIPTION = gql`
  subscription($partyId: ID!) {
    trades(partyId: $partyId) {
      ${QUERY}
    }
  }
`;

const Trades: FC = () => {
  const { activeKey } = useWallet();
  return !activeKey ? null : <TradesQuery {...{ activeKey }} />;
};

const TradesQuery: FC<{
  activeKey: string;
}> = ({ activeKey }) => {
  const { subscribeToMore, data, loading } = useQuery(TRADES_QUERY, {
    variables: { partyId: activeKey },
    client: client,
  });

  const trades: Trade[] = data?.party?.trades ?? [];

  const subscribeToTradesChange = () =>
    subscribeToMore({
      document: TRADES_SUBSCRIPTION,
      variables: { partyId: activeKey },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const trades: Trade[] = prev?.party?.trades?.slice() ?? [];

        const trade: Trade = subscriptionData.data.trades;
        const idx = trades.findIndex((p: Trade) => p.id === trade.id);
        if (~idx) {
          trades[idx] = trade;
        } else {
          trades.push(trade);
        }
        // console.log(trades);
        return Object.assign({}, prev, {
          party: { trades },
        });
      },
    });

  return <TradesSubscribe {...{ trades, subscribeToTradesChange, loading }} />;
};

const TradesSubscribe: FC<{
  subscribeToTradesChange: () => void;
  trades: Trade[];
  loading: boolean;
}> = ({ subscribeToTradesChange, trades, loading }) => {
  const classes = useStyles();

  useEffect(() => {
    subscribeToTradesChange();
  }, [subscribeToTradesChange]);

  return (
    <Box p={2}>
      {loading ? (
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
                    <TableCell>{trade.size}</TableCell>
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

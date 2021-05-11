import { FC, useEffect } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { gql, useQuery } from '@apollo/client';

import { Order } from 'vega/types';
import { client } from 'vega/ws';

import { useWallet } from 'hooks/vega-wallet';
import { LG, SM } from 'components/shared/Screen';

const useStyles = makeStyles((theme) => ({
  smOrderRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    '&:not(:first-child)': {
      borderTop: `1px solid ${theme.palette.grey[900]}`,
    },
  },
}));

const QUERY = `
  id
  price
  timeInForce
  side
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
  remaining
  createdAt
  expiresAt
  status
  type
`;

const ORDERS_QUERY = gql`
  query($partyId: ID!) {
    party(id: $partyId) {
      orders {
        ${QUERY}
      }
    }
  }
`;

const ORDERS_SUBSCRIPTION = gql`
  subscription($partyId: ID!) {
    orders(partyId: $partyId) {
      ${QUERY}
    }
  }
`;

const Orders: FC<{ filter: (order: Order) => boolean }> = ({ filter }) => {
  const { activeKey } = useWallet();
  return !activeKey ? null : <OrdersQuery {...{ activeKey, filter }} />;
};

const OrdersQuery: FC<{
  activeKey: string;
  filter: (order: Order) => boolean;
}> = ({ activeKey, filter }) => {
  const { subscribeToMore, data, loading } = useQuery(ORDERS_QUERY, {
    variables: { partyId: activeKey },
    client: client,
  });

  const orders: Order[] = (data?.party?.orders ?? []).filter(filter);

  const subscribeToOrdersChange = () =>
    subscribeToMore({
      document: ORDERS_SUBSCRIPTION,
      variables: { partyId: activeKey },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const orders: Order[] = (prev?.party?.orders?.slice() ?? []).filter(
          filter
        );

        const order: Order = subscriptionData.data.orders;
        const idx = orders.findIndex((p: Order) => p.id === order.id);
        if (~idx) {
          orders[idx] = order;
        } else {
          orders.push(order);
        }
        // console.log(orders);
        return Object.assign({}, prev, {
          party: { orders },
        });
      },
    });

  return <OrdersSubscribe {...{ orders, subscribeToOrdersChange, loading }} />;
};

const OrdersSubscribe: FC<{
  subscribeToOrdersChange: () => void;
  orders: Order[];
  loading: boolean;
}> = ({ subscribeToOrdersChange, orders, loading }) => {
  const classes = useStyles();

  useEffect(() => {
    subscribeToOrdersChange();
  }, [subscribeToOrdersChange]);

  return (
    <Box p={2}>
      {loading ? (
        <Box>Loading...</Box>
      ) : !orders.length ? (
        <Box>No orders found.</Box>
      ) : (
        <>
          <LG>
            <Table aria-label='Loans' size={'small'}>
              <TableHead>
                <TableRow>
                  <TableCell>Market</TableCell>
                  <TableCell align='right'>Size</TableCell>
                  <TableCell align='right'>Type</TableCell>
                  <TableCell align='right'>TIF</TableCell>
                  <TableCell align='right'>Price</TableCell>
                  <TableCell align='right'>Created At</TableCell>
                  <TableCell align='right'>Status</TableCell>
                  <TableCell align='right'></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell component='th' scope='row'>
                      {order.market.tradableInstrument.instrument.code}
                    </TableCell>
                    <TableCell>{order.size}</TableCell>
                    <TableCell align='right'>{order.type}</TableCell>
                    <TableCell align='right'>{order.timeInForce}</TableCell>
                    <TableCell align='right'>
                      {order.price / Math.pow(10, order.market.decimalPlaces)}
                    </TableCell>
                    <TableCell align='right'>{order.createdAt}</TableCell>
                    <TableCell align='right'>{order.status}</TableCell>
                    <TableCell align='right'>-</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </LG>
          <SM>
            {orders.map((order) => (
              <Box className={classes.smOrderRow} key={order.id} py={2}>
                <Box>Market</Box>
                <Box>{order.market.tradableInstrument.instrument.code}</Box>
                <Box>Size</Box>
                <Box>{order.size}</Box>
                <Box>Type</Box>
                <Box>{order.type}</Box>
                <Box>TIF</Box>
                <Box>{order.timeInForce}</Box>
                <Box>Price</Box>
                <Box>
                  {order.price / Math.pow(10, order.market.decimalPlaces)}
                </Box>
                <Box>Created At</Box>
                <Box>{order.createdAt}</Box>
                <Box>Status</Box>
                <Box>{order.status}</Box>
              </Box>
            ))}
          </SM>
        </>
      )}
    </Box>
  );
};

export default Orders;

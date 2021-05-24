import { FC } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { Order } from 'vega/types';
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

const Orders: FC<{ isLoadingOrders: boolean; orders: Order[] }> = ({
  isLoadingOrders,
  orders,
}) => {
  const classes = useStyles();

  return (
    <Box p={2}>
      {isLoadingOrders ? (
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
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell component='th' scope='row'>
                      {order.market.tradableInstrument.instrument.code}
                    </TableCell>
                    <TableCell align='right'>{order.size}</TableCell>
                    <TableCell align='right'>{order.type}</TableCell>
                    <TableCell align='right'>{order.timeInForce}</TableCell>
                    <TableCell align='right'>
                      {order.price / Math.pow(10, order.market.decimalPlaces)}
                    </TableCell>
                    <TableCell align='right'>{order.createdAt}</TableCell>
                    <TableCell align='right'>{order.status}</TableCell>
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

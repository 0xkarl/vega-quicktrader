import { FC } from 'react';
import { Order } from 'vega/types';
import Orders from './_Orders';

const OpenOrders: FC = () => {
  return <Orders filter={(order: Order) => order.status === 'Filled'} />;
};

export default OpenOrders;

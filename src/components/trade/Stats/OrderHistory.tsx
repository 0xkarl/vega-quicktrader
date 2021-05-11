import { FC } from 'react';
import { Order } from 'vega/types';
import Orders from './_Orders';

const OpenOrders: FC = () => {
  return <Orders filter={(order: Order) => true} />;
};

export default OpenOrders;

import { FC } from 'react';
import { useParty } from 'contexts/party';

import Orders from './_Orders';

const OpenOrders: FC = () => {
  const { closedOrders, isLoadingOrders } = useParty();
  return <Orders orders={closedOrders} {...{ isLoadingOrders }} />;
};

export default OpenOrders;

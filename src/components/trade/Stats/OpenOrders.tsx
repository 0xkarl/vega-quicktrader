import { FC } from 'react';
import { useParty } from 'contexts/party';

import Orders from './_Orders';

const OpenOrders: FC = () => {
  const { openOrders, isLoadingOrders } = useParty();
  return <Orders orders={openOrders} {...{ isLoadingOrders }} />;
};

export default OpenOrders;

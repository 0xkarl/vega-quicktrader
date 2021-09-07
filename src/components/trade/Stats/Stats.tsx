import { FC, useState, useMemo } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import { useParty } from 'contexts/party';
import Positions from './Positions';
import OpenOrders from './OpenOrders';
import OrderHistory from './OrderHistory';
import TradeHistory from './TradeHistory';

const TAB_COMPONENTS = [Positions, OpenOrders, OrderHistory, TradeHistory];

const Stats: FC = () => {
  const [tab, setTab] = useState(0);
  const { positions, openOrders, closedOrders, trades } = useParty();

  const handleTabChange = (event: any, tab: number) => {
    setTab(tab);
  };

  const activeContent = useMemo(() => {
    const Component = TAB_COMPONENTS[tab];
    return <Component />;
  }, [tab]);

  return (
    <Paper square>
      <Tabs
        value={tab}
        indicatorColor='primary'
        textColor='primary'
        onChange={handleTabChange}
        aria-label='stats'
      >
        <Tab label={<Box>Positions({positions.length})</Box>} value={0} />
        <Tab label={<Box>Open Orders({openOrders.length})</Box>} value={1} />
        <Tab
          label={<Box>Order History({closedOrders.length})</Box>}
          value={2}
        />
        <Tab label={<Box>Trade History({trades.length})</Box>} value={3} />
      </Tabs>
      {activeContent}
    </Paper>
  );
};

export default Stats;

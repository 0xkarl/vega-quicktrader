import { FC, useState, useMemo } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Positions from './Positions';
import OpenOrders from './OpenOrders';
import OrderHistory from './OrderHistory';
import TradeHistory from './TradeHistory';

const TAB_LABELS = [
  'Positions',
  'Open Orders',
  'Order History',
  'Trade History',
];

const TAB_COMPONENTS = [Positions, OpenOrders, OrderHistory, TradeHistory];

const Stats: FC = () => {
  const [tab, setTab] = useState(0);

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
        {TAB_LABELS.map((l, i) => (
          <Tab key={i} label={l} value={i} />
        ))}
      </Tabs>
      {activeContent}
    </Paper>
  );
};

export default Stats;

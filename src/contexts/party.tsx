import {
  FC,
  useContext,
  createContext,
  ReactNode,
  useEffect,
  useMemo,
} from 'react';
import { useQuery } from '@apollo/client';
import { client } from 'vega/ws';
import { Account, Order, Position, Trade } from 'vega/types';
import { useWallet } from './vega-wallet';
import { useMarkets } from './markets';

import { ACCOUNTS_QUERY, ACCOUNTS_SUBSCRIPTION } from 'vega/queries/accounts';
import {
  POSITIONS_QUERY,
  POSITIONS_SUBSCRIPTION,
} from 'vega/queries/positions';
import { ORDERS_QUERY, ORDERS_SUBSCRIPTION } from 'vega/queries/orders';
import { TRADES_QUERY, TRADES_SUBSCRIPTION } from 'vega/queries/trades';

const PartyContext = createContext<{
  accounts: Account[];
  isLoadingAccounts: boolean;
  activeMarketAccounts: Account[];
  activeMarketBalance: number;
  isLoadingPositions: boolean;
  positions: Position[];
  isLoadingOrders: boolean;
  openOrders: Order[];
  closedOrders: Order[];
  isLoadingTrades: boolean;
  trades: Trade[];
} | null>(null);

export const PartyProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { activeKey } = useWallet();

  return !activeKey ? (
    <PartyContext.Provider
      value={{
        accounts: [],
        isLoadingAccounts: false,
        activeMarketAccounts: [],
        activeMarketBalance: 0,
        isLoadingPositions: false,
        positions: [],
        isLoadingOrders: false,
        openOrders: [],
        closedOrders: [],
        isLoadingTrades: false,
        trades: [],
      }}
    >
      {children}
    </PartyContext.Provider>
  ) : (
    <Load {...{ activeKey }}>{children}</Load>
  );
};

const Load: FC<{
  children: ReactNode;
  activeKey: string;
}> = ({ children, activeKey }) => {
  const { activeMarket } = useMarkets();

  const {
    subscribeToMore: subscribeToMoreAccountsData,
    data: accountsData,
    loading: isLoadingAccounts,
  } = useQuery(ACCOUNTS_QUERY, {
    variables: { partyId: activeKey },
    client: client,
  });

  const {
    subscribeToMore: subscribeToMorePositionsData,
    data: positionsData,
    loading: isLoadingPositions,
  } = useQuery(POSITIONS_QUERY, {
    variables: { partyId: activeKey },
    client: client,
  });

  const {
    subscribeToMore: subscribeToMoreOrdersData,
    data: ordersData,
    loading: isLoadingOrders,
  } = useQuery(ORDERS_QUERY, {
    variables: { partyId: activeKey },
    client: client,
  });

  const {
    subscribeToMore: subscribeToMoreTradesData,
    data: tradesData,
    loading: isLoadingTrades,
  } = useQuery(TRADES_QUERY, {
    variables: { partyId: activeKey },
    client: client,
  });

  // accounts

  useEffect(() => {
    const unsub = subscribeToMoreAccountsData({
      document: ACCOUNTS_SUBSCRIPTION,
      variables: { partyId: activeKey },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const accounts: Account[] = prev?.party?.accounts?.slice() ?? [];

        const account: Account =
          subscriptionData.data.accounts[0] ?? subscriptionData.data.accounts;

        const idx = accounts.findIndex(
          (a: Account) =>
            a.asset.symbol === account.asset.symbol && a.type === account.type
        );
        if (~idx) {
          accounts[idx] = account;
        } else {
          accounts.push(account);
        }
        // return Object.assign({}, prev, {
        //   party: { accounts },
        // });
        return { party: { accounts } };
      },
    });

    return unsub;
  }, [subscribeToMoreAccountsData, activeKey]);

  // positions

  useEffect(() => {
    const unsub = subscribeToMorePositionsData({
      document: POSITIONS_SUBSCRIPTION,
      variables: { partyId: activeKey },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const positions: Position[] = prev?.party?.positions?.slice() ?? [];

        const position: Position =
          subscriptionData.data.positions[0] ?? subscriptionData.data.positions;

        const idx = positions.findIndex(
          (p: Position) => p.market.id === position.market.id
        );
        if (~idx) {
          positions[idx] = position;
        } else {
          positions.push(position);
        }
        // return Object.assign({}, prev, {
        //   party: { positions },
        // });
        return { party: { positions } };
      },
    });

    return unsub;
  }, [subscribeToMorePositionsData, activeKey]);

  // orders

  useEffect(() => {
    const unsub = subscribeToMoreOrdersData({
      document: ORDERS_SUBSCRIPTION,
      variables: { partyId: activeKey },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const orders: Order[] = prev?.party?.orders?.slice() ?? [];

        const order: Order =
          subscriptionData.data.orders[0] ?? subscriptionData.data.orders;
        const idx = orders.findIndex((p: Order) => p.id === order.id);
        if (~idx) {
          orders[idx] = order;
        } else {
          orders.push(order);
        }

        return Object.assign({}, prev, {
          party: { orders },
        });
      },
    });

    return unsub;
  }, [subscribeToMoreOrdersData, activeKey]);

  // trades

  useEffect(() => {
    const unsub = subscribeToMoreTradesData({
      document: TRADES_SUBSCRIPTION,
      variables: { partyId: activeKey },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const trades: Trade[] = prev?.party?.trades?.slice() ?? [];

        const trade: Trade =
          subscriptionData.data.trades[0] ?? subscriptionData.data.trades;
        const idx = trades.findIndex((p: Trade) => p.id === trade.id);
        if (~idx) {
          trades[idx] = trade;
        } else {
          trades.push(trade);
        }

        return Object.assign({}, prev, {
          party: { trades },
        });
      },
    });

    return unsub;
  }, [subscribeToMoreTradesData, activeKey]);

  // compute

  const accounts: Account[] = useMemo(() => {
    const accounts = accountsData?.party?.accounts?.slice() ?? [];

    accounts.sort((a: Account, b: Account) => {
      if (a.asset.name > b.asset.name) return -1;
      if (a.asset.name < b.asset.name) return 1;
      return 0;
    });

    return accounts;
  }, [accountsData]);

  const activeMarketAccounts = useMemo(
    () =>
      !activeMarket
        ? []
        : accounts.filter(
            (a) =>
              a.asset.id ===
              activeMarket.tradableInstrument.instrument.product.settlementAsset
                .id
          ) ?? [],
    [activeMarket, accounts]
  );

  const activeMarketBalance = useMemo(
    () => activeMarketAccounts.reduce((r, a) => r + parseInt(a.balance), 0),
    [activeMarketAccounts]
  );

  const positions: Position[] = useMemo(() => {
    const positions = positionsData?.party?.positions?.slice() ?? [];

    positions.sort((a: Position, b: Position) => {
      if (a.market.name > b.market.name) return 1;
      if (a.market.name < b.market.name) return -1;
      return 0;
    });

    return positions;
  }, [positionsData]);

  const openOrders: Order[] = useMemo(() => {
    return ordersFilter(ordersData, openOrdersFilter);
  }, [ordersData]);

  const closedOrders: Order[] = useMemo(() => {
    return ordersFilter(ordersData, closedOrdersFilter);
  }, [ordersData]);

  const trades: Trade[] = useMemo(() => {
    const trades = tradesData?.party?.trades.slice() ?? [];

    trades.sort((a: Trade, b: Trade) => {
      if (a.createdAt > b.createdAt) return -1;
      if (a.createdAt < b.createdAt) return 1;
      return 0;
    });

    return trades;
  }, [tradesData]);

  return (
    <PartyContext.Provider
      value={{
        accounts,
        isLoadingAccounts,
        activeMarketAccounts,
        activeMarketBalance,
        isLoadingPositions,
        positions,
        isLoadingOrders,
        openOrders,
        closedOrders,
        isLoadingTrades,
        trades,
      }}
    >
      {children}
    </PartyContext.Provider>
  );
};

export function useParty() {
  const context = useContext(PartyContext);
  if (!context) {
    throw new Error('Missing party context');
  }
  const {
    accounts,
    isLoadingAccounts,
    activeMarketAccounts,
    activeMarketBalance,
    isLoadingPositions,
    positions,
    isLoadingOrders,
    openOrders,
    closedOrders,
    isLoadingTrades,
    trades,
  } = context;

  return {
    accounts,
    isLoadingAccounts,
    activeMarketAccounts,
    activeMarketBalance,
    isLoadingPositions,
    positions,
    isLoadingOrders,
    openOrders,
    closedOrders,
    isLoadingTrades,
    trades,
  };
}

function ordersFilter(data: any, filter: (order: Order) => boolean) {
  const orders = (data?.party?.orders ?? []).filter(filter);

  orders.sort((a: Order, b: Order) => {
    if (a.createdAt > b.createdAt) return -1;
    if (a.createdAt < b.createdAt) return 1;
    return 0;
  });

  return orders;
}

function openOrdersFilter(order: Order) {
  return order.status === 'Active';
}

function closedOrdersFilter(order: Order) {
  return true;
}

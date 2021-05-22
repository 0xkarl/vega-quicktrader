import {
  FC,
  useContext,
  createContext,
  ReactNode,
  useEffect,
  useMemo,
} from 'react';
import { gql, useQuery } from '@apollo/client';
import { client } from 'vega/ws';
import { Account } from 'vega/types';
import { useWallet } from './vega-wallet';
import { useMarkets } from './markets';

const ACCOUNT_QUERY = `
balance
type
asset {
  id
  name
  symbol
  decimals
}
market {
  id
  name
  decimalPlaces
  tradableInstrument {
    instrument {
      code
    }
  }
}`;

const ACCOUNTS_QUERY = gql`
  query($partyId: ID!) {
    party(id: $partyId) {
      accounts {
        ${ACCOUNT_QUERY}
      }
    }
  }
`;

const ACCOUNTS_SUBSCRIPTION = gql`
  subscription($partyId: ID!) {
    accounts(partyId: $partyId) {
      ${ACCOUNT_QUERY}
    }
  }
`;

const PartyContext = createContext<{
  accounts: Account[];
  isLoadingAccounts: boolean;
  activeMarketAccounts: Account[];
  activeMarketBalance: number;
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

  const { subscribeToMore, data, loading: isLoadingAccounts } = useQuery(
    ACCOUNTS_QUERY,
    {
      variables: { partyId: activeKey },
      client: client,
    }
  );

  const accounts: Account[] = useMemo(() => {
    const accounts = data?.party?.accounts?.slice() ?? [];

    accounts.sort((a: Account, b: Account) => {
      if (a.asset.name > b.asset.name) return -1;
      if (a.asset.name < b.asset.name) return 1;
      return 0;
    });

    return accounts;
  }, [data]);

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

  useEffect(() => {
    const unsub = subscribeToMore({
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
  }, [subscribeToMore, activeKey]);

  return (
    <PartyContext.Provider
      value={{
        accounts,
        isLoadingAccounts,
        activeMarketAccounts,
        activeMarketBalance,
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
  } = context;

  return {
    accounts,
    isLoadingAccounts,
    activeMarketAccounts,
    activeMarketBalance,
  };
}

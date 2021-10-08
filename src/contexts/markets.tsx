import {
  FC,
  ReactNode,
  createContext,
  useMemo,
  useState,
  useEffect,
  useContext,
} from 'react';
import * as api from 'vega/api';
import { useWallet } from './vega-wallet';
import { ID, Market } from 'vega/types';
import { VEGA_WALLET_ACTIVE_MARKET_ID_CACHE_KEY } from 'config';
import cache from 'utils/cache';

const MarketsContext = createContext<{
  marketsMap: Map<string, Market>;
  marketsList: Market[];
  activeMarketId: ID | null;
  setActiveMarketId: (id: ID) => void;
  trade: (opts: {
    side: string;
    price?: number;
    size: number;
    type: string;
    expiresAt?: number;
  }) => void;
  activeMarket: Market | null;
} | null>(null);

export const MarketsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [marketsMap, setMarkets] = useState(new Map<string, Market>());
  const [activeMarketId, setActiveMarketIdState] = useState<ID | null>(
    cache(VEGA_WALLET_ACTIVE_MARKET_ID_CACHE_KEY)
  );
  const { activeKey } = useWallet();
  const marketsList: Market[] = useMemo(() => Array.from(marketsMap.values()), [
    marketsMap,
  ]);
  const activeMarket = useMemo(
    () => (!activeMarketId ? null : marketsMap.get(activeMarketId) ?? null),
    [activeMarketId, marketsMap]
  );

  const setActiveMarketId = (id: string | null) => {
    setActiveMarketIdState(id);
    cache(VEGA_WALLET_ACTIVE_MARKET_ID_CACHE_KEY, id);
  };

  useEffect(() => {
    let isMounted = true;
    const unsubs = [() => (isMounted = false)];

    const loadMarkets = async () => {
      const { markets } = await api.graphql(`
      query {
        markets {
          id
          name
          decimalPlaces
          tradableInstrument {
            instrument {
              code
              product {
                ... on Future {
                  settlementAsset {
                   id
                   decimals
                   symbol
                  }
                }
              }
            }
          }
        }
      }
      `);
      if (isMounted) {
        setMarkets(new Map(markets.map((m: Market) => [m.id, m])));
        if (!activeMarketId) {
          const { id } =
            markets.find((m: Market) => ~m.name.search(/tesla/i)) ?? markets[0];
          setActiveMarketId(id);
        }
      }
    };

    loadMarkets();

    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  }, [setMarkets, activeMarketId]);

  const trade = async ({
    side,
    price,
    size,
    type,
    expiresAt,
  }: {
    side: string;
    price?: number;
    size: number;
    type: string;
    expiresAt?: number;
  }) => {
    const market = marketsMap.get(activeMarketId!)!;
    if (expiresAt) {
      const { timestamp: blockchainTime } = await api.node('/time');
      expiresAt = parseInt(blockchainTime) + expiresAt * 10 ** 9;
    }
    const { signedTx } = await api.wallet({
      method: 'POST',
      endpoint: '/command',
      data: {
        pubKey: activeKey,
        propagate: true,
        orderSubmission: {
          marketId: activeMarketId,
          ...(price
            ? { price: price * Math.pow(10, market.decimalPlaces) }
            : {}),
          size,
          side: `SIDE_${side}`,
          ...(type === 'MARKET'
            ? { timeInForce: 'TIME_IN_FORCE_IOC' }
            : expiresAt
            ? { timeInForce: 'TIME_IN_FORCE_GTT', expiresAt }
            : { timeInForce: 'TIME_IN_FORCE_GTC' }),
          type: `TYPE_${type}`,
        },
      },
      auth: true,
    });
    console.log({ signedTx });
  };

  return (
    <MarketsContext.Provider
      value={{
        marketsMap,
        marketsList,
        activeMarketId,
        setActiveMarketId,
        trade,
        activeMarket,
      }}
    >
      {children}
    </MarketsContext.Provider>
  );
};

export function useMarkets() {
  const context = useContext(MarketsContext);
  if (!context) {
    throw new Error('Missing markets context');
  }
  const {
    marketsMap,
    marketsList,
    activeMarketId,
    setActiveMarketId,
    trade,
    activeMarket,
  } = context;

  return {
    marketsMap,
    marketsList,
    activeMarketId,
    setActiveMarketId,
    trade,
    activeMarket,
  };
}

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
import { ID, Market, Position } from 'vega/types';

const MarketsContext = createContext<{
  marketsMap: Map<string, Market>;
  marketsList: Market[];
  activeMarketId: ID | null;
  setActiveMarketId: (id: ID) => void;
  trade: (opts: {
    side: string;
    price: number;
    size: number;
    type: string;
    expiresAt?: number;
  }) => void;
  positions: Position[];
} | null>(null);

export const MarketsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [marketsMap, setMarkets] = useState(new Map<string, Market>());
  const [activeMarketId, setActiveMarketId] = useState<ID | null>(null);
  const [positions, setPositions] = useState<Position[]>([]);

  const { activeKey } = useWallet();

  const marketsList: Market[] = useMemo(() => Array.from(marketsMap.values()), [
    marketsMap,
  ]);

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
            }
          }
        }
      }
      `);
      if (isMounted) {
        setMarkets(new Map(markets.map((m: Market) => [m.id, m])));
        const { id } =
          markets.find((m: Market) => ~m.name.search(/tesla/i)) ?? markets[0];
        setActiveMarketId(id);
      }
    };

    loadMarkets();

    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  }, [setMarkets]);

  useEffect(() => {
    if (!activeKey) return;

    let isMounted = true;
    const unsubs = [() => (isMounted = false)];

    const loadPositions = async () => {
      const { parties } = await api.graphql(
        `
      query($id: ID!) {
        parties(id: $id) {
          positions {
            market {
              name
              decimalPlaces
            }
            openVolume
            realisedPNL
            unrealisedPNL
            averageEntryPrice
            margins {
              asset {
                name
                symbol
              }
            }
          }
        }
      }
      `,
        {
          id: activeKey,
        }
      );
      if (isMounted) {
        setPositions(parties[0].positions);
      }
    };

    loadPositions();

    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  }, [setPositions, activeKey]);

  const trade = async ({
    side,
    price,
    size,
    type,
    expiresAt,
  }: {
    side: string;
    price: number;
    size: number;
    type: string;
    expiresAt?: number;
  }) => {
    const market = marketsMap.get(activeMarketId!)!;
    const { blob, submitId } = await api.rest('/orders/prepare/submit', {
      submission: {
        marketId: activeMarketId,
        partyId: activeKey,
        price: price * Math.pow(10, market.decimalPlaces),
        size,
        side: `SIDE_${side}`,
        ...(expiresAt
          ? { timeInForce: 'TIME_IN_FORCE_GTT', expiresAt }
          : { timeInForce: 'TIME_IN_FORCE_GTC' }),
        type: `TYPE_${type}`,
      },
    });
    console.log({ submitId });
    const { signedTx } = await api.wallet({
      method: 'POST',
      endpoint: '/messages/sync',
      data: {
        tx: blob,
        pubKey: activeKey,
        propagate: true,
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
        positions,
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
    positions,
  } = context;

  return {
    marketsMap,
    marketsList,
    activeMarketId,
    setActiveMarketId,
    trade,
    positions,
  };
}
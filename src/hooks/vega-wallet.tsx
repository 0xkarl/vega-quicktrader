import {
  FC,
  useState,
  useContext,
  useEffect,
  createContext,
  ReactNode,
} from 'react';
import {
  VEGA_WALLET_TOKEN_CACHE_KEY,
  VEGA_WALLET_HOST_CACHE_KEY,
  VEGA_WALLET_ACTIVE_KEY_CACHE_KEY,
} from 'config';
import cache from 'utils/cache';
import * as api from 'vega/api';
import { Key } from 'vega/types';

const WalletContext = createContext<{
  token: string;
  connect: (creds: {
    host: string;
    wallet: string;
    passphrase: string;
  }) => void;
  disconnect: () => void;
  isConnecting: boolean;
  setIsConnecting: (isConnecting: boolean) => void;
  keys: Key[];
  activeKey: string;
  setActiveKey: (key: string | null) => void;
  isSelectingActiveKey: boolean;
  startConnecting: () => void;
} | null>(null);

export const WalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setTokenState] = useState(cache(VEGA_WALLET_TOKEN_CACHE_KEY));
  const [activeKey, setActiveKeyState] = useState(
    cache(VEGA_WALLET_ACTIVE_KEY_CACHE_KEY)
  );
  const [keys, setKeys] = useState<Key[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSelectingActiveKey, setIsSelectingActiveKey] = useState(false);

  const setActiveKey = (key: string | null) => {
    cache(VEGA_WALLET_ACTIVE_KEY_CACHE_KEY, key);
    setActiveKeyState(key);
  };

  const setToken = (token: string | null) => {
    cache(VEGA_WALLET_TOKEN_CACHE_KEY, token);
    setTokenState(token);
  };

  const startConnecting = () => {
    setIsSelectingActiveKey(false);
    setIsConnecting(true);
  };

  const connect = async ({
    host,
    wallet,
    passphrase,
  }: {
    host: string;
    wallet: string;
    passphrase: string;
  }) => {
    cache(VEGA_WALLET_HOST_CACHE_KEY, host);

    const token = await getToken(wallet, passphrase);
    setToken(token);

    const keys = await getKeys();
    setKeys(keys);
    if (keys.length && !activeKey) {
      setActiveKey(keys[0].pub);
    }

    setIsSelectingActiveKey(true);
  };

  async function disconnect() {
    setToken(null);
    setActiveKey(null);
  }

  useEffect(() => {
    let isMounted = true;
    const unsubs = [() => (isMounted = false)];

    const load = async () => {
      if (!cache(VEGA_WALLET_TOKEN_CACHE_KEY)) return;
      const keys = await getKeys();
      if (isMounted) setKeys(keys);
    };

    load();

    return () => {
      unsubs.forEach((u) => u());
    };
  }, []);

  return (
    <WalletContext.Provider
      value={{
        token,
        connect,
        disconnect,
        isConnecting,
        setIsConnecting,
        keys,
        activeKey,
        setActiveKey,
        isSelectingActiveKey,
        startConnecting,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('Missing vega wallet context');
  }
  const {
    token,
    connect,
    disconnect,
    isConnecting,
    setIsConnecting,
    keys,
    activeKey,
    setActiveKey,
    isSelectingActiveKey,
    startConnecting,
  } = context;

  return {
    token,
    connect,
    disconnect,
    isConnecting,
    setIsConnecting,
    keys,
    activeKey,
    setActiveKey,
    isSelectingActiveKey,
    startConnecting,
  };
}

async function getToken(wallet: string, passphrase: string): Promise<string> {
  const { token } = await api.wallet({
    method: 'POST',
    endpoint: '/auth/token',
    data: {
      wallet,
      passphrase,
    },
  });
  return token;
}

async function getKeys(): Promise<Key[]> {
  const { keys } = await api.wallet({
    method: 'GET',
    endpoint: '/keys',
    auth: true,
  });
  return keys;
}

import fetch from 'unfetch';
import {
  VEGA_WALLET_HOST_CACHE_KEY,
  VEGA_WALLET_TOKEN_CACHE_KEY,
} from 'config';
import cache from 'utils/cache';

export async function wallet({
  method,
  path,
  data,
  auth,
}: {
  method: string;
  path: string;
  data?: any;
  auth?: boolean;
}) {
  const host = cache(VEGA_WALLET_HOST_CACHE_KEY);
  const token = cache(VEGA_WALLET_TOKEN_CACHE_KEY);

  const res = await fetch(host + path, {
    method,
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      ...(auth ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  return await res.json();
}
